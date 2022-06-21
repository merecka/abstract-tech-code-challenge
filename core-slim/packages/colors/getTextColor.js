import chroma from 'chroma-js';
import getColor from './getColor';
import { defaultColors, toString } from './utils';
/**
 * @method getTextColor
 * @desc determines whether light or dark text should be used based on provided
 * background color.
 * @alias module:@abst/colors#getTextColor
 * @memberof module:@abst/colors
 *
 * @param {Color} backgroundColor Can be dot-separated
 * theme color (i.e. `'primary.dark'`) or any color value
 * @param {string} [format='hex'] formatted color type; one of
 * `hex|css|rgb|rgba|hsl|hsv|hsi|hcl|lab`
 * @param {string} [palette] alternate palette to use (app defaults are
 * otherwise applied or, when used via {@link Theme}, the current theme colors)
 *
 * @returns {string} formatted color value for `text.primary` or `text.inverse`
 */
export default (bg, retType = 'hex', colors = defaultColors) => {
  const { darkest = 'black', lightest = 'white' } = colors?.text || {};
  if (_.includes('rgba', retType)) retType = 'css';
  bg = toString(getColor(bg, 'hex', colors));
  if (chroma.contrast(bg, lightest) < 2.5) return darkest;
  return lightest;
};
