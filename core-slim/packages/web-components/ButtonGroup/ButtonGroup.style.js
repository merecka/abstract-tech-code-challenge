export const css = (theme, { gutter = 8 }) => {
  return {
    wpr: {
      '&.layout-pill': {
        '.btn-wpr': {
          'padding': `0 calc(${gutter}${_.isFinite(gutter) ? 'px' : ''} / 2)`,
          '&.isDisabled': { cursor: 'not-allowed' },

          '&:first-child': { paddingLeft: '0' },
          '&:last-child': { paddingRight: '0' },
        }
      }
    }
  };
};
