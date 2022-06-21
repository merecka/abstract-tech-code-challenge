import config from '@abst/config';
export const typography = {

  // font weight
  fontWeightExtraLight: 100,
  fontWeightLight: 300,
  fontWeightNormal: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  fontWeightExtraBold: 900,

  // font size
  fontSize: 14,
  fontStyleButtonFontSize: 16,
  buttonFontSize: 16,
  h1FontSize: 40,
  h2FontSize: 32,
  h3FontSize: 28,
  h4FontSize: 24,
  h5FontSize: 20,
  h6FontSize: 16,
  display1FontSize: 56,
  display2FontSize: 48,
  display3FontSize: 40,
  display4FontSize: 32,
  display5FontSize: 26,
  display6FontSize: 18,
  d1FontSize: 56,
  d2FontSize: 48,
  d3FontSize: 40,
  d4FontSize: 32,
  d5FontSize: 26,
  d6FontSize: 18
};

/**
 * @member fonts
 * @memberof module:@abst/theme
 * @alias module:@abst/theme.fonts
 *
 * @prop {string} body Font to use everywhere except titles and button labels
 * @prop {string} title Font to use in titles and button labels.
 *
 */
export const fonts = config.fonts;

export default { typography, fonts };
