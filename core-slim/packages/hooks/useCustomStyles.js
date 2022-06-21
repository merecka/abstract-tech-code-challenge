import { useCallback, useMemo, useState } from 'react';
import { createMemo, useDeepCompareEffect, useMediatedState } from 'react-use';
import { useTheme } from '@abst/theme/hooks/useTheme';
import { useDidUpdate } from './useDidUpdate';

/* remove props that may cause circular updates */
const getProps = (props) => _.omitBy(props, (val, key) =>
  _.includes(['children', 'sty', 'className'], key) || _.isFunction(val)
);
const getColors = (theme) => theme.colors;

function createGenerateStyles(config) {
  const { defaultProps, theme: themeProps = {}} = config;
  return function getStyles(styles, theme, props) {
    return styles({ ...theme, ...themeProps }, { ...defaultProps, ...props });
  };
}
function mediateTheme([parent, getTheme = () => ({})]) {
  return { ...parent, ...getTheme(parent) };
}


/**
 * @hook useCustomStyles
 * @desc secondary style hook that allows for some additional configuration;
 * prefer {@link useStyles}
 * @alias useCustomStyles
 * @memberof module:@abst/hooks
 *
 * @param {object} config config object
 * @param {function} [config.getTheme] theme overrides; accepts parent
 * theme as only parameter
 * @param {object} [config.defaultProps] prop default values
 * @param {boolean} [config.defaultProps.hot] {@link useStyles} hot config
 * @param {...any} [config.rest] additional config passed to {@link useStyles}
 * @param {ReactStyles} styles style function
 * @param {object} props props to pass to `styles` function
 *
 * @returns {object} style object
 *
 * @example <caption>usage</caption>
 * import { useCustomStyles } from '@abst/hooks';
 * import styles from './Sfc.style';
 *
 * function Sfc(props) {
 *   const CustomStyles = useCustomStyles({}, styles, props);
 * }
 */
export function useCustomStyles(config, styles, props = {}) {
  /* ensure first argument is config */
  if (!_.isPlainObject(config)) {
    throw new Error('config object is required for useCustomStyles');
  }
  /* memoize config */
  const { getTheme, ...staticConf } = useMemo(() => config, []);
  const hasThemeFn = useMemo(() => _.isFunction(getTheme), []);

  /* theme conf/watchers */
  const [_theme] = useTheme();
  const filterTheme = useMemo(() => createMemo(getColors), []);
  const clrs = filterTheme(_theme);

  /* props conf/watchers */
  const filterProps = useMemo(() => createMemo(getProps), []);
  const filtProps = filterProps(props);
  const isHot = useMemo(() =>
    !!filtProps.hot || !!config.defaultProps?.hot, []
  );

  /* set up theme overrides */
  const initialTheme = useMemo(() =>
    hasThemeFn ? mediateTheme([_theme, getTheme]) : _theme
  , []);
  const [theme, setTheme] = useMediatedState(mediateTheme, initialTheme);

  if (isHot) {
    useDeepCompareEffect(() => { setTheme([_theme, getTheme]); }, [clrs]);
  } else {
    useDidUpdate(() => { setTheme([_theme, getTheme]); }, clrs);
  }


  /* create styles generator callback */
  const generateStyles = useMemo(() => createGenerateStyles(staticConf), []);
  const getStyles = useCallback(generateStyles, []);

  /* set initial styles once */
  const initialSty = useMemo(() => getStyles(styles, theme, props), []);

  /* memoize returned styles */
  const [sty, setSty] = useState(initialSty);

  /* set callback w/ optional debug generator */
  if (isHot) {
    useDeepCompareEffect(() => {
      setSty(getStyles(styles, theme, props));
    }, [filtProps, theme]);
  } else {
    useDidUpdate(() => {
      setSty(getStyles(styles, theme, props));
    }, filtProps, theme);
  }
  return sty;
}
