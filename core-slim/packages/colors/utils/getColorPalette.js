import chroma from 'chroma-js';
import colorGrid from '../colorGrid';
import { darken, desaturate, fade, lighten } from '../modifiers';
import getColorScale from './getColorScale';
import config from '@abst/config';

const omittedPaletteKeys = ['dark', 'canvas', 'text'];

/* build scales for each palette color */
const buildPalette = (_colors) => _.mapValues(_colors, (v) => getColorScale(v));

/* parses a color palette value to chroma-compat color */
const findColor = (value, key) => {
  /* directly return hex and rgb values */
  if (_.startsWith(value, 'rgb')) return chroma(value).hex();
  if (_.startsWith(value, '#')) return value;

  /* directly return colorGrid colors passed as a dot-notated string */
  if (_.has(colorGrid, [value])) return colorGrid[value][500];

  /* accept config where color and shade are passed */
  if (_.isObject(value)) {
    return colorGrid[value?.color]?.[value?.shade] || colorGrid.grey[500];
  }

  /* validate, then return formatted color */
  if (chroma.valid(value)) return chroma(value).hex();

  /* if color is invalid, return gray but throw a warning */
  console.warn(`invalid theme color ${value} passed @ ${key}`);
  return colorGrid.grey[500];
};

/* build color scale for each item in the palette config */
const getColors = (palette, isDark = false) => {
  let colors = _.omit(palette, omittedPaletteKeys);
  if (isDark && !!palette?.dark) {
    colors = _.defaults({},
      _.omit(palette.dark, omittedPaletteKeys), colors
    );
  }
  /* create "brand" key with all the "primaries" */
  const brand = _.mapValues(colors, findColor);
  /* normalize the lightness of primary and then desaturate it for gray */
  const middlePrimary = chroma(brand.primary).set('hsl.l', isDark ? 0.75 : 0.6);
  const gray = getColorScale(desaturate(middlePrimary, 98), 0.96, 0.075);

  /* create canvas colors */
  const Lightest = chroma(palette?.canvas || 'hsl(240,10%,96%)');
  const lightest = Lightest.css();

  const Darkest = chroma(palette?.dark?.canvas || 'hsl(240,10%,15%)');
  const darkest = Darkest.css();

  const Canvas = isDark ? Darkest : Lightest;
  const canvasPrimary = Canvas.css();
  /* create object for .canvas */
  const canvas = {
    disabled: chroma(canvasPrimary)
    .set('hsl.l', isDark ? 0.4 : 0.80)
    .set('hsl.s', 0)
    .css(),
    inverse: isDark ? lightest : darkest,
    primary: canvasPrimary,
    component: lighten(canvasPrimary, isDark ? 4 : 99)
  };

  /* create text colors */
  const palText = isDark ? palette?.dark?.text : palette?.text;
  const Text = chroma(palText || canvas.inverse);
  const textPrimary = Text.css();

  /* create object for .text */
  const text = _.assign({}, brand, {
    primary: textPrimary,
    faded: fade(textPrimary, isDark ? 50 : 33),
    inverse: canvas.primary,
    disabled: isDark
      ? lighten(canvas.disabled, 30)
      : darken(canvas.disabled, 50),
    hint: gray.light,
    lightest,
    darkest
  });

  /* return the palette */
  return {
    brand,
    canvas,
    text,
    ...buildPalette(brand),
    clear: 'rgba(0,0,0,0)',
    gray,
    line: fade(canvas.inverse, isDark ? 75 : 60),
    white: gray.lightest,
  };
};

/**
 * @method getColorPalette
 * @desc builds a complete color palette for both light and dark variants
 * @alias module:@abst/#getColorPalette
 * @memberof module:@abst/colors
 *
 * @param {object} palette=Config.theme {@link Config} theme configuration
 *
 * @returns {ColorPalette}
 */
export default (palette = config.theme) => ({
  light: getColors(palette),
  dark: getColors(palette, true)
});
