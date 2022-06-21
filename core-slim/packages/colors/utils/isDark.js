import chroma from 'chroma-js';
/**
 * @method isDark
 * @desc determines whether a color is more dark than light, all things being equal
 * @alias module:@abst/colors#isDark
 * @memberof module:@abst/colors
 *
 * @param {string} color  chroma-compatible color value
 *
 * @returns {boolean} evaluation result
 */
export default (color) => chroma.contrast(color, '#111') < 2.5;
