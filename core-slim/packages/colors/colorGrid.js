import chroma from 'chroma-js';

const common = {
  black: '#000',
  white: '#fff',
  transparent: 'rgba(0, 0, 0, 0)'
};

const colors = {
  red: [[244, 67, 54], [183, 28, 28]],
  pink: [[233, 30, 99], [136, 14, 79]],
  purple: [[156, 39, 176], [74, 20, 140]],
  deepPurple: [[103, 58, 183], [49, 27, 146]],
  indigo: [[63, 81, 181], [26, 35, 126]],
  blue: [[33, 150, 243], [13, 71, 161]],
  lightBlue: [[3, 169, 244], [1, 87, 155]],
  cyan: [[0, 188, 212], [0, 96, 100]],
  teal: [[0, 150, 136], [0, 77, 64]],
  green: [[102, 187, 106], [27, 94, 32]],
  lightGreen: [[139, 195, 74], [51, 105, 30]],
  lime: [[205, 220, 57], [130, 119, 23]],
  yellow: [[255, 235, 59], [245, 127, 23]],
  amber: [[255, 193, 7], [255, 111, 0]],
  orange: [[255, 152, 0], [230, 81, 0]],
  deepOrange: [[255, 87, 34], [191, 54, 12]],
  brown: [[121, 85, 72], [62, 39, 35]],
  blueGrey: [[96, 125, 139], [38, 50, 56]],
  grey: [[158, 158, 158], [33, 33, 33]],
};

const getScale = (base, dark) => {
  const light = base.set('hsl.l', 0.9);
  return chroma.scale([light, base, dark]).colors(9);
};

const grid = _.mapValues(colors, ([base, dark]) => {
  base = chroma(...base, 'rgb');
  dark = chroma(...dark, 'rgb');

  const shades = _.reduce(getScale(base, dark), (memo, val, i) => ({
    ...memo, [(i + 1) * 100]: val
  }), { [50]: base.set('hsl.l', 0.975).hex() });

  return _.reduce([100, 200, 400, 700], (memo, key) => ({
    ...memo,
    [`A${key}`]: chroma(memo[key]).set('hsl.s', '*2').set('hsl.l', '*0.95').hex()
  }), shades);
});

/**
 * @typedef {object} ColorGridColor
 * @desc palette for each color in {@link ColorGrid}
 * @alias ColorGridColor
 * @memberof module:@abst/colors
 *
 * @prop {number} [50]      lightest shade
 * @prop {number} [100]     ...
 * @prop {number} [200]     ...
 * @prop {number} [300]     ...
 * @prop {number} [400]     ...
 * @prop {number} [500]     ...
 * @prop {number} [600]     ...
 * @prop {number} [700]     ...
 * @prop {number} [800]     ...
 * @prop {number} [900]     darkest shade
 * @prop {string} [A100]    lightest shade of saturated base variant
 * @prop {string} [A200]    medium-light shade of saturated base variant
 * @prop {string} [A300]    medium-dark shade of saturated base variant
 * @prop {string} [A400]    darkest shade of saturated base variant
 */

/**
 * @typedef ColorGrid
 * @desc all the colors of the rainbow, basically
 * @memberof module:@abst/colors
 * @alias module:@abst/colors#colorGrid
 *
 * @prop {ColorGridColor} [red]
 * @prop {ColorGridColor} [pink]
 * @prop {ColorGridColor} [purple]
 * @prop {ColorGridColor} [deepPurple]
 * @prop {ColorGridColor} [indigo]
 * @prop {ColorGridColor} [blue]
 * @prop {ColorGridColor} [lightBlue]
 * @prop {ColorGridColor} [cyan]
 * @prop {ColorGridColor} [teal]
 * @prop {ColorGridColor} [green]
 * @prop {ColorGridColor} [lightGreen]
 * @prop {ColorGridColor} [lime]
 * @prop {ColorGridColor} [yellow]
 * @prop {ColorGridColor} [amber]
 * @prop {ColorGridColor} [orange]
 * @prop {ColorGridColor} [deepOrange]
 * @prop {ColorGridColor} [brown]
 * @prop {ColorGridColor} [blueGrey]
 * @prop {ColorGridColor} [grey]
 *
 */

/**
 * @member {ColorGrid} colorGrid
 * @desc every color ever. prefer theme colors; don't use this unless you're
 * really in a pickle.
 * @memberof module:@abst/colors
 * @alias module:@abst/colors#colorGrid
 *
 * @prop {object}       [common]                some commonly used colors
 * @prop {string}       [common.black]          `#000`
 * @prop {string}       [common.white]          `#fff`
 * @prop {string}       [common.transparent]    `rgba(0, 0, 0, 0)`
 * @prop {...ColorGrid} [...rest]          all the colors
 */
export default { ...grid, common };
