import { useCallback, useMemo, useState } from 'react';
// import { useDeepCompareEffect } from 'react-use';
import { useDidUpdate } from './useDidUpdate';
import { useStyles } from './useStyles';
import { useCssNano } from './useCssNano';
import Config from '@abst/config';

const isDev = Config.env === 'development';
const stringArgs = (isDev ? [] : [36]);
let counter = 0;

/**
 * @hook useCss
 * @desc like {@link useStyles}, execpt that it returns a CSS class string for
 * each key returned in the provided `styles` function.
 * @alias useCss
 * @memberof module:@abst/hooks
 *
 * @param {function} styles CSS generator function. Each key/value pair returned
 * should contain a valid style block.
 * @param {object} [props={}] props or subset of props that should be made available
 * to the `styles` function. For optimization purporses, only pass necessary props
 * here, as `styles` re-evaluates each time props change.
 * @param {object} [defaultProps={}] prop value defaults
 * @param {string} [prefix] prefix to attach to each generated class name
 *
 * @returns {object} object with CSS class name strings corresponding to each
 * key in the object returned from `styles`
 *
 * @example <caption>usage</caption>
 * // MightBeOnFire.style.js
 * export const css = (theme, props) => {
 *   return {
 *     wpr: {
 *       backgroundColor: props.isOnFire
 *         ? theme.colors.canvas.component
 *         : theme.colors.danger.saturated
 *     }
 *   };
 * };
 *
 * // MightBeOnFire.jsx
 * import { useCss } from '@abst/hooks';
 * import styles from './MightBeOnFire.style';
 *
 * import { View } from '@abst/web-components';
 * import cn from 'classnames';
 *
 * export function MightBeOnFire({ className, isOnFire, ...rest }) {
 *   const cls = useCss(styles, { isOnFire });
 *   return <View { ...rest } className={ cn(cls.wpr, className) } />;
 * }
 */
export function useCss(styles, props = {}, defaultProps, prefix) {
  /* set defaults once */
  const defaults = useMemo(() =>
    _.isPlainObject(defaultProps) ? defaultProps : {}
  , []);

  /* set prefix once on load */
  const pfx = useMemo(() => {
    let _pfx = prefix;
    if (typeof defaultProps === 'string') _pfx = defaultProps;
    else if (!prefix) _pfx = '';
    if (prefix?.length) _pfx = `${prefix}-`;
    return _pfx;
  }, []);

  /* style getter */
  const { sheet } = useCssNano();
  const makeClasses = useCallback((ctr, styls) => {
    return sheet(styls, `${pfx}${ctr.toString(...stringArgs)}`);
  }, []);

  const sty = useStyles(styles, props, defaults);
  const initial = useMemo(() => makeClasses((counter++), sty), []);
  const [classes, setClasses] = useState(initial);

  useDidUpdate(() => { setClasses(makeClasses((counter++), sty)); }, sty);
  return classes;
}
