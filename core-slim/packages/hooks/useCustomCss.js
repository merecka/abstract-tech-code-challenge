import { useCallback, useMemo, useState } from 'react';
import { useDidUpdate } from './useDidUpdate';
import { useCustomStyles } from './useCustomStyles';
import { useCssNano } from './useCssNano';
import Config from '@abst/config';

const isDev = Config.env === 'development';
const stringArgs = (isDev ? [] : [36]);
let counter = 0;

/**
 * @hook useCustomCss
 * @desc creates a {@link module} instance with addons from {@link useCssNano}
 * @alias useCustomCss
 * @memberof module:@abst/hooks
 *
 * @param {object} config config object
 * @param {array<string>} [config.addons=[]] {@link useCssNano} addons to
 * include. If `keyframes` addon is specified; the nano-css keyframe generator
 * is attached to theme @ `.keyframes`.
 * @param {array<string>} [config.plugins] alias of `config.addons`
 * @param {string} [config.prefix] prefix for generated class names
 * @param {object} [config.theme] overrides applied to `theme` param passed to {@link CoreStyleGenerator}
 *
 * @returns {object} same return value as useCss
 *
 * @example <caption>usage</caption>
 * import { useCustomCss } from '@abst/hooks';
 *
 * function Sfc() {
 *   const CustomCss = useCustomCss({ addons: ['keyframes'], prefix: 'fire' });
 * }
 */
export function useCustomCss(config, styles, props = {}) {
  /* ensure first argument is config */
  if (!_.isPlainObject(config)) {
    throw new Error('config object is required for useCustomCss');
  }
  const {
    addons = [], plugins = addons, prefix, theme: _themeOverrides
  } = useMemo(() => config, []);

  const { keyframes, sheet } = useCssNano(plugins);
  const styleConf = useMemo(() => {
    const _thm = { ..._themeOverrides };
    if (_.includes(plugins, 'keyframes')) _thm.keyframes = keyframes;
    return { ..._.omit(config, ['plugins', 'prefix']), theme: _thm };
  }, []);
  const sty = useCustomStyles(styleConf, styles, props);


  /* create stylesheet generator */
  const pfx = useMemo(() => !!prefix?.length ? `${prefix}-` : '', []);
  const makeClasses = useCallback((ctr, styls) => {
    return sheet(styls, `${pfx}core-cst-css-${ctr.toString(...stringArgs)}`);
  }, []);

  /* set classes */
  const initialClasses = useMemo(() => makeClasses((counter++), sty), []);
  const [classes, setClasses] = useState(initialClasses);
  useDidUpdate(() => { setClasses(makeClasses((counter++), sty)); }, sty);

  return classes;
}
