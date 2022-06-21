import Col from 'color';
const getAmt = (a) => a < 1 > 0 ? a : a / 100;
const processClr = (method) => (clr, amt = 0.5) =>
  Col(clr)[method](getAmt(amt)).rgb().string();
/**
  * @method darken
  * @memberof module:@abst/theme
  * @alias module:@abst/theme.darken
  * @param {string|array|object}   col         Any valid Color value
  * @param {number}                [amt=0.5]   percentage to apply
  *
  * @return {string}                           modified rgb value
  */
export const darken = processClr('darken');
/**
 * @method desaturate
 * @memberof module:@abst/theme
 * @alias module:@abst/theme.desaturate
 * @param {string|array|object}   col         Any valid Color value
 * @param {number}                [amt=0.5]   percentage to apply
 *
 * @return {string}                           modified rgb value
 */
export const desaturate = processClr('desaturate');
/**
 * @method fade
 * @memberof module:@abst/theme
 * @alias module:@abst/theme.fade
 * @param {string|array|object}   col         Any valid Color value
 * @param {number}                [amt=0.5]   percentage to apply
 *
 * @return {string}                           modified rgb value
 */
export const fade = processClr('fade');
/**
 * @method invert
 * @memberof module:@abst/theme
 * @alias module:@abst/theme.invert
 * @param {string|array|object}   col         Any valid Color value
 *
 * @return {string}                           inverted rgb value
 */
export const invert = (col) => Col(col).negate().rgb().string();
/**
 * @method lighten
 * @memberof module:@abst/theme
 * @alias module:@abst/theme.lighten
 * @param {string|array|object}   col         Any valid Color value
 * @param {number}                [amt=0.5]   percentage to apply
 *
 * @return {string}                           modified rgb value
 */
export const lighten = processClr('lighten');
/**
 * @method saturate
 * @memberof module:@abst/theme
 * @alias module:@abst/theme.saturate
 * @param {string|array|object}   col         Any valid Color value
 * @param {number}                [amt=0.5]   percentage to apply
 *
 * @return {string}                           modified rgb value
 */
export const saturate = processClr('saturate');

/**
 * @method toGray
 * @desc returns the grayscale equivalent of a color
 * @memberof module:@abst/theme
 * @alias module:@abst/theme.toGray
 * @param {string|array|object}   col         Any valid Color value
 * @return {string}                           modified rgb value
 */
export const toGray = (col) => Col(col).grayscale().rgb().string();


export default { darken, desaturate, fade, invert, lighten, saturate, toGray };
