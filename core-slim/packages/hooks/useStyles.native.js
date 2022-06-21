import { useCallback, useMemo, useState } from 'react';
import { useDeepCompareEffect } from 'react-use';
import { useTheme } from '@abst/theme/hooks/useTheme';
import { StyleSheet } from 'react-native';
import { useMediatedValue } from './useMediatedValue';

const dontWatch = ['children', 'sty', 'className'];
/* filters props that shouldn't be analyzed for changes */
const watchedProps = (props) =>
  _.omitBy(props, (v, k) => _.includes(dontWatch, k) || _.isFunction(v));


const inherit = ['style', 'wrapperStyle'];

/* runs a filter check on props to ensure passed style props are flattened */
const getProps = (props) => {
  const ret = { ...props };
  _.each(_.keys(ret), (path) => {
    if ((
      _.startsWith(path, '$') ||                     /* $ token is present OR */
      _.includes(inherit, path)                       /* it's def a style AND */
    ) && _.isArray(props[path])) {                           /* it's an array */
      /* replace in return object with flattened style */
      ret[_.trimStart(path, '$')] = StyleSheet.flatten(ret[path]);
    }
  });

  return ret;
};

function generateStyles(defaults) {
  return function getStyles(styles, theme, props) {
    return styles(theme, _.defaults({}, props, defaults));
  };
}
/**
 * @hook useStyles
 * @desc connects styles to theme
 * @alias module:@abst/hooks#useStylesNative
 * @memberof module:@abst/hooks
 *
 * @param {function} styles styles function; accepts ({@link Theme}, `props`) as arguments
 * @param {object} [props={}] any props that should be passed to the `styles` function
 * @param {object} [defaultProps={}] prop default values + special config
 * @param {boolean} [defaultProps.flatten=false] whether
 * {@link https://reactnative.dev/docs/stylesheet#flatten|StyleSheet.flatten}
 * should run before styles are returned.
 * @param {boolean} [defaultProps.styleSheet=true] whether
 * {@link https://reactnative.dev/docs/stylesheet#create|StyleSheet.create}
 * should run before styles are returned.
 *
 * @returns {any} whatever the provided `styles` function returns
 *
 * @example <caption>import</caption>
 * import { useStyles } from '@abst/hooks';
 *
 * function Sfc() {
 *   const Styles = useStyles();
 * }
 */
export function useStyles(styles, props = {}, defaultProps = {}) {
  const defaults = useMemo(() => ({
    flatten: true, styleSheet: true, ...defaultProps
  }), []);
  const genSty = useMemo(() => generateStyles(defaults), []);

  const getStyles = useCallback(genSty, []);
  const [theme] = useTheme();
  const filtProps = useMediatedValue(getProps, props);
  const initialSty = useMemo(() => getStyles(styles, theme, filtProps), []);

  const [sty, setSty] = useState(initialSty);
  const watchProps = useMediatedValue(watchedProps, props);
  useDeepCompareEffect(() => {
    setSty(getStyles(styles, theme, filtProps));
  }, [watchProps, _.omitBy(theme, _.isFunction)]);

  if (defaults.flatten) return StyleSheet.flatten(sty);
  if (defaults.styleSheet) return StyleSheet.create(sty);
  return sty;
}
