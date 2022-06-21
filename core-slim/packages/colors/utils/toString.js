import chroma from 'chroma-js';

/**
 * @method toString
 * @desc converts color value to most compatible theme value based on color's alpha channel values
 * @alias module:@abst/colors#toString
 * @memberof module:@abst/colors
 *
 * @returns {string} formatted color value
 */
export default (clr) => {
  const color = chroma(clr);
  if (color.alpha() < 1) return color.css();
  return color.css('rgb');
};
