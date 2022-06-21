import { themeVars } from './themeVars';
import { getColor, getTextColor } from '@abst/colors';
import { createElevate } from './createElevate';

export function createGenerateTheme(getOverrides, conf = {}) {
  const { fontConfig, dynamicThemeVariables, staticThemeVariables } = conf;
  return ({ colors, ...rest }, parent) => {
    let theme = _.assign({}, themeVars, staticThemeVariables, parent, {
      fontConfig,
      colors,
      getColor: (c, type) => getColor(c, type, colors),
      getTextColor: (c, type) => getTextColor(c, type, colors),
    }, rest);

    theme = _.defaultsDeep({}, getOverrides(theme), theme);
    /* add elevate util */
    theme.elevate = createElevate(theme);

    if (dynamicThemeVariables) {
      theme = _.defaultsDeep({}, dynamicThemeVariables(theme), theme);
    }

    return theme;
  };
}
