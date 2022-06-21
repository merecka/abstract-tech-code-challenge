import { splitJoinedArray } from '@abst/utils';
import defaultPal from '../colorPalette';
import Color from 'color';

/**
 * @method getColor
 * @memberof module:@abst/theme
 * @alias module:@abst/theme.getColor
 * @desc convenience method, typically used to turn a theme-color reference like `brand.primary` into its representative rgb value.
 * @param {string} [color=colors.text.primary] Can be hex (i.e. '#ffffff'), rgb/a (i.e 'rgb(0,0,0)',
 * 'rgba(0,0,0,1)'), or dot-separated theme color (i.e. 'primary.dark')
 * @return {string} the rgb value of the indicated color
 *
 */
export default function getColor(color, retType = 'hex', colors = defaultPal) {
  let _color = color;
  let type;
  let variant;
  let colorArr;
  if (!color) return colors.text.primary;
  if (_.startsWith(color, '#') || _.startsWith(color, 'rgb')) return color;
  if (_.isString(color)) colorArr = splitJoinedArray(color, '.');
  else if (_.isArray(color)) colorArr = color;

  if (colorArr) {
    type = colorArr[0];
    variant = colorArr[1] || 'primary';
  }
  if (_.has(colors, [type, variant])) {
    _color = colors[type][variant];
    return Color(_color)[retType]();
  }
  return color;
}
