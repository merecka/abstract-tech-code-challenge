import config from '@abst/config';
const { theme, logo: { src } = {}, logoSrc } = config;
const fallback = {
  primary: '#295393',
  secondary: '#855121',
  tertiary: '#3c2a69',
  success: '#0d7824',
  info: '#0998d5',
  warning: '#c19600',
  danger: '#c60e00',
  dark: {
    primary: '#9fbeee',
    secondary: '#fbbb80',
    tertiary: '#b9a0fa',
    success: '#83f99c',
    info: '#91ddfe',
    warning: '#ffda5b',
    danger: '#ff9890'
  }
};

function noop() {}

const init = {
  darkMode: true,
  getters: { getColor: noop, getTextColor: noop },
  logoSrc: src || logoSrc,

  /* from getColors */
  allColors: {},
  colors: {},
  palette: {}
};

export function createInitialState(darkMode, getColors, parentPalette = null) {
  return {
    ...init,
    darkMode,
    parentPalette,
    ...getColors(_.defaultsDeep({}, theme, fallback), darkMode, parentPalette)
  };
}
