import { useCallback, useMemo, useState } from 'react';
import { createMemo, useCustomCompareEffect } from 'react-use';
import { useTheme } from '@abst/theme/hooks/useTheme';
import isEqual from 'fast-deep-equal';

function depsAreEqual([pProps, pTheme], [nProps, nTheme]) {
  return isEqual(pProps, nProps) && isEqual(pTheme, nTheme);
}

/* remove props that may cause circular updates */
const getProps = (props) => _.omitBy(props, (val, key) =>
  _.includes(['children', 'sty', 'className', 'hot'], key) || _.isFunction(val)
);
const getTheme = (theme) => _.omitBy(theme, _.isFunction);

function generateStyles(defaults) {
  return function getStyles(styles, theme, props) {
    return styles(theme, { ...defaults, ...props });
  };
}

/**
 * @hook useStyles
 * @desc connects styles to theme
 * @alias module:@abst/hooks#useStyles
 * @memberof module:@abst/hooks
 *
 * @param {function} styles styles function; accepts ({@link Theme}, `props`) as arguments
 * @param {object} [props={}] any props that should be passed to the `styles` function
 * @param {object} [defaultProps={}] prop default values + special config
 * @param {boolean} [defaultProps.hot=false] allows for looser re-evaluation of
 * `styles`; usesful in development when styles should update on save
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
  const defaults = useMemo(() => defaultProps, []);
  const filterProps = useMemo(() => createMemo(getProps), []);
  const filterTheme = useMemo(() => createMemo(getTheme), []);
  const genSty = useMemo(() => generateStyles(defaults), []);

  const getStyles = useCallback(genSty, []);
  const [theme] = useTheme();
  const initialSty = useMemo(() => getStyles(styles, theme, props), []);

  const [sty, setSty] = useState(initialSty);
  const filtProps = filterProps(props);
  const filtTheme = filterTheme(theme);
  // const isHot = useMemo(() => (!!props.hot || !!defaults.hot), []);
  // if (isHot) {
  useCustomCompareEffect(() => {
    setSty(getStyles(styles, theme, props));
  }, [filtProps, filtTheme], depsAreEqual);
  // } else {
  //   useDidUpdate(() => {
  //     setSty(getStyles(styles, theme, props));
  //   }, filtProps, clrs);
  // }
  return sty;
}
