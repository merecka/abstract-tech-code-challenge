export { default as defaultColors } from './defaultColors';
export { default as getColorPalette } from './getColorPalette';
export { default as getColorScale } from './getColorScale';
export { default as isDark } from './isDark';
export { default as toString } from './toString';

/**
 * @typedef {object} CorePalette
 * @desc light/dark theme color maps
 * @alias CorePalette
 * @memberof module:@abst/colors
 * @prop {CoreColors} light light theme colors
 * @prop {CoreColors} dark dark theme colors
 */

/**
 * @typedef {object} CoreColors
 * @desc color map for a single theme/appearance type
 * @alias CoreColors
 * @memberof module:@abst/colors
 *
 * @prop {object} brand primary values for each color type
 * @prop {string} brand.primary main brand color
 * @prop {string} brand.secondary primary accent color; should compliment primary
 * @prop {string} brand.tertiary secondary accent color; should contrast primary
 * @prop {string} brand.success status color; used to indicate a positive
 * result; typically some shade of green
 * @prop {string} brand.info status color; used to indicate information of some
 * kind; typically some shade of blue
 * @prop {string} brand.warning status color; used to indicate a non-critical
 * error or high-priority message; typically some shade of yellow
 * @prop {string} brand.danger status color; used to indicate an error;
 * typically some shade of red.
 *
 * @prop {object} canvas background colors
 * @prop {string} canvas.primary main background color
 * @prop {string} canvas.component UI element background color
 * @prop {string} canvas.disabled disabled area background color
 * @prop {string} canvas.inverse primary background color, but opposite

 * @prop {object} text text colors
 * @prop {string} text.primary main text color
 * @prop {string} text.disabled disabled text color
 * @prop {string} text.inverse primary text color, but opposite
 */

/**
 * @typedef {object} CoreColorScale
 * @desc keys for each color within a {@link CoreColors} item.
 * @alias CoreColorScale
 * @memberof module:@abst/colors
 *
 * @prop {}
 */
