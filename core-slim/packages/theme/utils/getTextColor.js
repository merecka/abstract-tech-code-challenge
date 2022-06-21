import { getColor } from './getColor';
import Color from 'color';
import colors from '../colorPalette';

/**
 * @method getTextColor
 * @memberof module:@abst/theme
 * @alias module:@abst/theme.getTextColor
 * @desc determines whether text over provided color should be primary or inverse based the color's shade.
 * @param {string} color any valid Color value.
 * @return {string} the rgb value to use for the text.
 *
 */
export function getTextColor(bgColor) {
  return Color(getColor(bgColor)).isLight() ?
    colors.text.darkest : colors.text.lightest;
}
