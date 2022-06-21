export const css = (theme/* , props */) => {
  const { colors: { canvas, success, text }} = theme;
  return {
    wpr: {
      'alignItems': 'center',
      'justifyContent': 'center',
      'alignSelf': 'stretch',
      'flex': '1 1 auto',
      'margin': '0 -6px',
      'padding': '0 6px',

      '.core-text.player-name': {
        color: text.primary
      }
    },
    success: { '&.shot-clock, &.shot-clock.danger': {
      'backgroundColor': success.primary,
      'borderColor': success.primary,
      '.time': { color: canvas.primary }
    }}
  };
};
