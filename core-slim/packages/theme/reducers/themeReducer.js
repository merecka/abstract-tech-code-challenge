import { THEME as types, INIT } from '@abst/action-types';
// import config from '@abst/config';
// const { theme, logo: { src } = {}, logoSrc } = config;
const init = { darkMode: true/* , logoSrc: src || logoSrc, palette: theme */ };

export default (state = init, { type, payload }) => {
  switch(type) {
    // case types.RESET: return init;
    // case types.RESET_PALETTE: return { ...state, palette: init.palette };
    // case types.SET_COLORS: return { ...state, palette: payload };
    case types.SET_DARK_MODE: return { ...state, darkMode: Boolean(payload) };
    // case types.SET_LOGO_SRC: return { ...state, logoSrc: payload };
    case INIT: case '@@INIT': return {
      darkMode: _.isBoolean(state.darkMode) ? state.darkMode : true
    };
    default: return state;
  }
};
