import * as defaults from '../themeDefaults';
import * as modifiers from '@abst/colors/modifiers';
import * as utils from '../utils';
import { typography, fonts } from '../typography';
import spacing from '../spacing';
import { colorGrid } from '@abst/colors';
import config from '@abst/config';

export const themeVars = {
  ..._.defaults({}, config.template, defaults),
  ...modifiers,
  ...utils,
  typography,
  fonts,
  colorGrid,
  spacing
};
