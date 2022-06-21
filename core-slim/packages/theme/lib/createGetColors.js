import { getColorPalette } from '@abst/colors';
import { themeVars } from './themeVars';

function createGetDummyTheme(vars) {
  return function getDummyTheme(ret, type) {
    return { ...ret, ...themeVars, ...vars, colors: ret.allColors[type] };
  };
}

export function createGetColors(getPalette, conf) {
  const { /* isSubTheme,  */staticThemeVariables } = conf;
  let initial = true;
  const getDummyTheme = createGetDummyTheme(staticThemeVariables);

  return function getColors(palette, darkMode = true, parent) {
    const _palette = _.defaultsDeep({}, parent, palette);
    // console.log({ isSubTheme, palette, parent });
    let allColors = getColorPalette(_palette);
    let colors = allColors[darkMode ? 'dark' : 'light'];
    let ret = { allColors, colors, palette };

    /* regenerate return value if overrides are present */
    if (getPalette && initial) {
      palette = _.defaultsDeep({}, palette, {
        ...getPalette(getDummyTheme(ret, 'light')),
        dark: getPalette(getDummyTheme(ret, 'dark')),
      });

      allColors = getColorPalette(palette);
      colors = allColors[darkMode ? 'dark' : 'light'];
      ret = { allColors, colors, palette };
    }
    if (initial) initial = false;
    return ret;
  };
}
