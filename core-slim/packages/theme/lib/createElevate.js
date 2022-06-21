/* adds depth to "layered" ui element based on provided level */

const darkBg = {
  [0]: 0,
  [1]: 3,
  [2]: 6,
  [3]: 10,
  [4]: 13,
  [5]: 16,
  [6]: 19,
  [7]: 22
};

const lightBg = {
  [0]: 0,
  [1]: 31,
  [2]: 42,
  [3]: 48,
  [4]: 53,
  [5]: 58,
  [6]: 63,
  [7]: 68
};
const lMax = _.last(_.keys(darkBg));

export function createElevate(theme) {
  const { darkMode, darken, fade, lighten, colors: { canvas, gray }} = theme;

  /**
   * @method elevate
   * @memberof module:@abst/theme
   * @alias module:@abst/theme.elevate
   * @description applies depth properties to a style object
   *
   * @param {object} [config] configuration object
   * @param {number} [config.level=0] 0-based depth of the style being modified
   * @param {boolean} [config.dark] forces dark mode styles; useful when creating
   * theme-specific CSS blocks
   * @param {object} [config.important] style overrides; avoid using unless
   * absolutely necessary
   *
   * @param {object} [style] style block to modify; specified values will be
   * applied to dynamically generated values
   * @param {string}  [style.backgroundColor]
   * @param {string} [style.borderColor]
   * @param {string} [style.boxShadowColor]
   *
   * @example <caption>Std. Usage</caption>
   * // comonent.style.js
   * export default ({ elevate }) => ({
   *   wpr: elevate({ level: 1 }, {
   *      padding: '6px 8px'
   *   }
   * });
   *
   * // in dark mode would return:
   * {
   *   wpr: {
   *     padding: '6px 8px',
   *     background-color: 'rgb(52, 52, 54)',
   *     box-shadow: '
   *       rgb(20 19 19 / 12%) 1px 1px 2px 0px,
   *       rgb(20 19 19 / 12%) -1px -1px 1px 0p
   *     '
   *   }
   * }
   * // in light mode, returns a similar block, but with a border and different
   * // color values (obviously)
   */
  return ({ level: _level = 0, dark = darkMode, important } = {}, {
    backgroundColor = canvas.primary,
    borderColor = darken(backgroundColor, 15),
    boxShadowColor = fade(gray[dark ? 'darkest' : 'darker'], dark ? 88 : 94),
    ...rest
  } = {}) => {
    let level = _level;
    /* check for invalid level value type */
    if (!_.isFinite(level) || level <= 0) {
      console.warn(`elevate not applied; level must be a number (0-${lMax})`);
      return {};
    }
    /* check for level value range error */
    if (level > lMax) {
      console.warn(
        `Provided evelate level (${level}) exceeds the maximum value (${lMax})`
      );
      level = lMax;
    }
    const minus = level ? '-' : '';

    /* handle dark mode */
    if (dark) {
      return {
        ...rest,
        backgroundColor: lighten(backgroundColor, darkBg[level]),
        boxShadow: `\
          ${level}px ${level}px ${level + 1}px 0px ${boxShadowColor},\
          ${minus}${level}px ${minus}${level}px ${level}px 0px ${boxShadowColor}\
        `,
      };
    }

    /* light mode */
    return {
      ...rest,
      backgroundColor: lighten(backgroundColor, lightBg[level]),
      border: `${_.ceil(level / 2)}px solid ${borderColor}`,
      boxShadow: `\
        ${level + 1}px ${level + 1}px ${level + 3}px 0px ${boxShadowColor},\
        ${minus}${level}px ${minus}${level}px ${level + 2}px 0px ${boxShadowColor}\
      `,
      ...important
    };
  };
}
