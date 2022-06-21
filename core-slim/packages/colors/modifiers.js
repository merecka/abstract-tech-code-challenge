import chroma from 'chroma-js';

const getAmt = (a) => (a <= 1 > 0) ? a : Math.abs(a) / 100;

/**
 * @method darken
 * @memberof module:@abst/colors
 * @alias module:@abst/colors.darken
 *
 * @param {ChromaColor}           color        Any chroma-compatible Color value
 * @param {FlexiblePercentValue}  [amount=0.5] percentage to apply
 *
 * @return {string}                darkened color value
 */
export const darken = (clr, amt = 0.5, mode = 'lrgb') =>
  chroma.mix(clr, chroma(clr).set('hsl.l', 0), getAmt(amt), mode).hex();

/**
 * @method desaturate
 * @memberof module:@abst/colors
 * @alias module:@abst/colors.desaturate
 *
 * @param {ChromaColor}           color        Any chroma-compatible Color value
 * @param {FlexiblePercentValue}  [amount=0.5] percentage to apply
 *
 * @return {string}                desaturated color value
 */
export const desaturate = (clr, amt = 0.5) =>
  chroma(clr).set('hsl.s', `*${1 - getAmt(amt)}`).hex();

/**
 * @method fade
 * @memberof module:@abst/colors
 * @alias module:@abst/colors.fade
 *
 * @param {ChromaColor}           color        Any chroma-compatible Color value
 * @param {FlexiblePercentValue}  [amount=0.5] percentage to apply
 *
 * @return {string}                faded color value
 */
export const fade = (clr, amt = 0.5) =>
  chroma(clr).alpha((1 - getAmt(amt))).css();

/**
 * @method invert
 * @memberof module:@abst/colors
 * @alias module:@abst/colors.invert
 *
 * @param {ChromaColor}           color Any chroma-compatible Color value
 *
 * @return {string}                inverted color value
 */
export const invert = (clr) => {
  const color = chroma(clr);
  const hsl = color.hsl();
  if (_.isNaN(hsl[0])) return color.set('hsl.l', 1 - hsl[2]).hex();
  return color.set('hsl.h', '-180').hex();
};

/**
 * @method lighten
 * @memberof module:@abst/colors
 * @alias module:@abst/colors.lighten
 *
 * @param {ChromaColor}           color        Any chroma-compatible Color value
 * @param {FlexiblePercentValue}  [amount=0.5] percentage to apply
 *
 * @return {string}                lightened color value
 */
export const lighten = (clr, amt = 0.5, mode = 'lrgb') =>
  chroma.mix(clr, chroma(clr).set('hsl.l', 1), getAmt(amt), mode).hex();

/**
 * @method saturate
 * @memberof module:@abst/colors
 * @alias module:@abst/colors.saturate
 *
 * @param {ChromaColor}           color        Any chroma-compatible Color value
 * @param {FlexiblePercentValue}  [amount=0.5] percentage to apply
 *
 * @return {string}                saturated color value
 */
export const saturate = (clr, amt = 0.5) =>
  chroma(clr).set('hsl.s', `*${1 + getAmt(amt)}`).hex();

/**
 * @method toGray
 * @desc returns the grayscale equivalent of a color
 * @memberof module:@abst/colors
 * @alias module:@abst/colors.toGray
 *
 * @param {ChromaColor}           color Any chroma-compatible Color value
 *
 * @return {string}                corresponding grayscale color value
 */
export const toGray = (clr) => chroma(clr).desaturate(10).hex();


export default { darken, desaturate, fade, invert, lighten, saturate, toGray };
