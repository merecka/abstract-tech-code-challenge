import { THEME as types } from '@abst/action-types';

// const resetPalette = () => (dispatch) => {
//   dispatch({ type: types.RESET_PALETTE });
//   return Promise.resolve();
// };
// const reset = () => (dispatch) => {
//   dispatch({ type: types.RESET });
//   return Promise.resolve();
// };
//
// const updatePalette = (update) => (dispatch, getState) => {
//   const payload = _.defaults({}, update, getState().theme.palette);
//   dispatch({ type: types.SET_COLORS, payload });
//   return Promise.resolve();
// };
//
// const setLogo = (payload) => (dispatch) => {
//   dispatch({ type: types.SET_LOGO_SRC, payload });
//   return Promise.resolve();
// };

const setReduxDarkMode = (payload) => (dispatch) => {
  dispatch({ type: types.SET_DARK_MODE, payload });
  return Promise.resolve();
};

export const actions = { setReduxDarkMode };
