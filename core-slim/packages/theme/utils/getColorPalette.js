import Color from 'color';
import colorGrid from '../colorGrid';
import modifiers from '../colorModifiers';

const mods = {
  // shades
  darkest: (color) => modifiers.darken(color, 75),
  darker: (color) => modifiers.darken(color, 50),
  dark: (color) => modifiers.darken(color, 25),
  primary: (color) => color,
  light: (color) => modifiers.lighten(color, 25),
  lighter: (color) => modifiers.lighten(color, 50),
  lightest: (color) => modifiers.lighten(color, 75),

  // modifications
  desaturated: (color) => modifiers.desaturate(color, 50),
  faded: (color) => modifiers.fade(color, 40),
  inverse: (color) => modifiers.invert(color), // USE WITH CAUTION
  saturated: (color) => modifiers.saturate(color, 33),
};
const buildColor = (color) => _.mapValues(mods, (mod) => mod(color));
const buildPalette = (_colors) => _.mapValues(_colors, buildColor);
/* GRAY */
const gray = {
  lightest: modifiers.lighten(colorGrid.grey[50], 25),
  lighter: colorGrid.grey[100],
  light: colorGrid.grey[300],
  primary: colorGrid.grey[400],
  dark: colorGrid.grey[600],
  darker: colorGrid.grey[800],
  darkest: colorGrid.grey[900],
  ...colorGrid.grey
};

export default (palette, isDark = false) => {
  let colors = _.omit(palette, ['dark']);
  if (isDark && palette?.dark) colors = _.defaults({}, palette.dark, colors);

  const brand = _.mapValues(colors, (value) => {
    // accept colorGrid colors passed as a string
    if (_.has(colorGrid, [value])) {
      return Color(colorGrid[value][500]).rgb().string();
    }

    // accept hex and rgb values
    if (_.startsWith(value, 'rgb')) return value;
    if (_.startsWith(value, '#')) return Color(value).rgb().string();

    // accept config where color and shade are passed;
    if (_.isObject(value)) {
      return colorGrid[value.color]?.[value.shade] || colorGrid.grey[500];
    }

    console.warn(`invalid theme color ${value} passed`);
    return colorGrid.grey[500];
  });

  /* CANVAS */
  const canvasColor = isDark ? 'rgb(33,33,33)' : 'rgb(223,223,223)';
  const canvas = {
    disabled: gray.lighter,
    inverse: modifiers.invert(canvasColor),
    primary: canvasColor,
    component: modifiers.lighten(canvasColor, isDark ? 33 : 25)
  };

  const textColor = isDark ? gray.lightest : gray.darkest;
  const text = _.assign({}, brand, {
    disabled: gray.primary,
    hint: modifiers.fade(textColor, 62),
    icon: modifiers.fade(textColor, 62),
    divider: modifiers.fade(textColor, 88),
    lightDivider: modifiers.fade(textColor, 92.5),
    inverse: modifiers.invert(textColor),
    primary: textColor,
    lightest: gray.lightest,
    darkest: gray.darkest
  });


  return _.assign({}, {
    brand,
    canvas,
    clear: 'rgba(0,0,0,0)',
    gray,
    grey: gray,
    text,
    white: gray.lightest
  }, _.omit(colorGrid, ['grey']), buildPalette(brand));
};
