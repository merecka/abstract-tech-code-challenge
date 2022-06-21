import { splitJoinedArray } from '@abst/utils';

import colorGrid from './colorGrid';
import chroma from 'chroma-js';
import { defaultColors, toString } from './utils';

function makeColor(color, retType) {
  if (retType === 'hex') return color;
  return toString(chroma(color)[retType]());
}

/**
 * @method getColor
 * @desc convenience method, typically used to turn a theme-color reference
 * like `brand.primary` into its representative color value.
 * @memberof module:@abst/colors
 * @alias getColor
 *
 * @param {Color} [color='colors.text.primary'] Can be dot-separated theme color
 * (i.e. `'primary.dark'`) or any color value
 * {@link https://gka.github.io/chroma.js|chroma.js} recognizes.
 * @param {string} [format='hex'] formatted color type; one of
 * `hex|css|rgb|rgba|hsl|hsv|hsi|hcl|lab`
 * @param {string} [palette] alternate palette to use (app defaults are
 * otherwise applied or, when used via {@link Theme}, the current theme colors)
 *
 * @return {string} the formatted color value; if invalid, `text.primary`
 * value is returned
 */
export default (color, retType = 'hex', colors = defaultColors) => {
  if (_.includes('rgba', retType)) retType = 'css';
  let type;
  let variant;
  let colorArr;
  if (!color) return colors.text.primary;
  if (_.startsWith(color, '#') || _.startsWith(color, 'rgb')) return color;
  if (_.includes(['clear', 'transparent'], color)) return colors.clear;
  if (_.isString(color)) colorArr = splitJoinedArray(color, '.');
  else if (_.isArray(color)) colorArr = color;

  if (colorArr) {
    type = colorArr[0];
    variant = colorArr[1] || 'primary';
  }

  if (_.has(colors, [type, variant])) {
    return makeColor(colors[type][variant], retType);
  }
  if (_.has(colorGrid, [type, variant])) {
    return makeColor(colorGrid[type][variant], retType);
  }
  if (chroma.valid(color)) return makeColor(color, retType);
  return colors.text.primary;
};
