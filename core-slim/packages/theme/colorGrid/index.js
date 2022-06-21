import Color from 'color';
import amber from './amber';
import blue from './blue';
import blueGrey from './blueGrey';
import brown from './brown';
import cyan from './cyan';
import common from './common';
import deepOrange from './deepOrange';
import deepPurple from './deepPurple';
import green from './green';
import grey from './grey';
import indigo from './indigo';
import lightBlue from './lightBlue';
import lightGreen from './lightGreen';
import lime from './lime';
import orange from './orange';
import pink from './pink';
import purple from './purple';
import red from './red';
import teal from './teal';
import yellow from './yellow';

/**
 * @member colorGrid
 * @memberof module:@abst/theme
 * @alias module:@dumble-core/color#grid
 * @alias module:@dumble-core/color#colorGrid
 * @desc every color ever. Don't use this unless you're really in a pickle.
 */
const grid = {
  amber, blue, blueGrey, brown, common, cyan, deepOrange, deepPurple, green,
  grey, indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal,
  yellow
};

const colorGrid = _.mapValues(grid, (pallette) =>
  _.mapValues(pallette, (color) => Color(color).rgb().string()));

export default colorGrid;
