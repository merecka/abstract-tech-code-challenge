import chroma from 'chroma-js';
import { desaturate, fade, invert, saturate } from '../modifiers';

/**
 * @method getColorScale
 * @desc returns a color scale for the provided color
 * @alias module:@abst/colors#getColorScale
 * @memberof module:@abst/colors
 *
 * @param {ChromaColor} primary       color to set as `primary` (middle) value
 * @param {number}      [start=0.925] lightness (0-1) of `lightest` value
 * @param {number}      [end=0.15]    lightness (0-1) of `darkest` value
 *
 * @returns {ThemeColor} typed color scale
 */
export default (primary, start = 0.925, end = 0.15) => {
  const color = chroma(primary);
  const white = color.set('hsl.l', start);
  const black = color.set('hsl.l', end);

  /* eslint-disable no-unused-vars */
  const [
    lightest, lighter, light, X, dark, darker, darkest
  ] = chroma.scale([white, primary, black]).colors(7);

  return {
    lightest, lighter, light, primary, dark, darker, darkest,
    saturated: saturate(primary, 1 / 3),
    desaturated: desaturate(primary),
    faded: fade(primary, 40),
    inverse: invert(primary),
  };
};
