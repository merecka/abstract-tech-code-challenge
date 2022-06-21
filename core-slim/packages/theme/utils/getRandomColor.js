import colors from '../colorGrid';
const flatColorArray = _.flatten(_.map(_.omit(colors, ['common']), _.toArray));
const colorCount = flatColorArray.length;

const randomIndex = () => _.random(0, (colorCount - 1));

/**
 * @method getRandomColor
 * @memberof module:@abst/theme
 * @alias module:@abst/theme.getRandomColor
 * @desc Take a guess at what this method does. You're correct.
 * @return {string} a random color
 *
 */
export function getRandomColor() {
  return flatColorArray[randomIndex()];
}
