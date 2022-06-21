
export const css = (theme, { width, height }) => {
  const shortSide = _.min([width, height]);
  const {
    colors: { canvas, danger, text, warning },
    fonts
  } = theme;
  return {
    wpr: {
      'border': `3px solid ${text.primary}`,
      'flex': 1,
      'justifyContent': 'center',

      '.ctr': {
        alignSelf: 'center',
      },

      '.time': {
        // position: 'aboslute',
        // top: 0, bottom: 0, right: 0, left: 0,
        fontFamily: fonts.monospace,
        fontWeight: 900,
        fontSize: shortSide - 12, /* (2 * gutter [6]) + (2 * thickest border [3]) */
        letterSpacing: -1.5,
        lineHeight: 1,
        textAlign: 'center'
      },

      '&.warning': {
        'borderColor': warning.primary,
        '.time': { color: warning.primary }
      },

      '&.danger': {
        'borderColor': danger.saturated,
        '.time': { color: danger.saturated }
      },
      '&.zero': {
        'backgroundColor': danger.saturated,
        '.time': { color: canvas.primary }
      }
    }
  };
};
