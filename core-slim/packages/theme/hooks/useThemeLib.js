import { useMemo } from 'react';
import { useAsyncReducer } from '@abst/hooks/useAsyncReducer';
import { useDidUpdate } from '@abst/hooks/useDidUpdate';
import { useMediatedValue } from '@abst/hooks/useMediatedValue';

import {
  createGenerateTheme,
  createGetColors,
  createInitialState,
  createReducer
} from '../lib';
import { useDarkMode } from './useDarkMode';
import isEqual from 'fast-deep-equal';

function empty() { return {}; }
function warn() { console.warn('`setDarkMode` is not available in sub-theme'); }

export function useThemeLib(conf = {}) {
  const {
    extend,
    getPalette: _getPalette, getOverrides = empty,
    isSubTheme: _isSubTheme, parentPalette, parentTheme,
    setDarkMode = warn,
    ...rest
  } = conf;

  const isSubTheme = useMemo(() => _isSubTheme === true, []);
  // if (isSubTheme) console.log('parent', parentPalette);
  const isDark = useDarkMode();
  /* generate the new palette */
  const getPalette = useMemo(() => {
    if (!!_getPalette && !_.isFunction(_getPalette)) return () => _getPalette;
    return _getPalette;
  }, []);

  const getColors = useMemo(() => createGetColors(getPalette, conf), []);

  const generateTheme = useMemo(() =>
    createGenerateTheme(getOverrides, rest)
  , []);

  /* create local reducer */
  const initialState = useMemo(() =>
    createInitialState(isDark, getColors, parentPalette)
  , []);

  const reducer = useMemo(() => createReducer(initialState, getColors), []);
  const [state, dispatch] = useAsyncReducer(reducer, initialState);

  /* create lib */
  const lib = useMemo(() => ({
    ...rest,
    resetPalette: () => dispatch('reset palette'),
    setDarkMode,
    setLogo: (src) => dispatch('update logo', src),
    updatePalette: (update) => dispatch('update palette', update),
    update: (update) => dispatch('update', update),
  }), []);

  useDidUpdate((pIsDark) => {
    if (isDark !== pIsDark) dispatch('set dark mode', isDark);
  }, isDark, []);

  /* watch parent palette if necessary */
  if (isSubTheme) {
    useDidUpdate((pParPal) => {
      if (!isEqual(pParPal, parentPalette)) {
        dispatch('set parent palette', parentPalette);
      }
    }, parentPalette, {});
  }

  /* update theme when any other values change */
  return useMediatedValue((st, parent) => {
    const theme = generateTheme(_.omit(st, ['allColors']), parent);
    let addl = {};

    if (!!extend) {
      if (_.isPlainObject(extend)) addl = extend;
      else if (_.isFunction(extend)) addl = extend(theme);

      if (_.isPlainObject(addl)) _.assign(theme, addl);
    }

    return [theme, lib];
  }, state, _.omitBy(parentTheme, _.isFunction));
}
