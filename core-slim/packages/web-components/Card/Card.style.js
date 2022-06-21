
export const css = ({ colors, fade }) => {
  const border = `1px solid ${fade(colors.canvas.inverse, 92)}`;
  return {
    card: {
      'backgroundColor': colors.canvas.component,
      'lineHeight': 'inherit',

      '.ant-card-head': {
        'borderBottomWidth': 0,
        'alignItems': 'center',
        'display': 'flex',
        'padding': '4px 8px',
        'width': '100%',
        'marginBottom': 0,

        '.ant-card-head-wrapper': {
          alignItems: 'stretch',
          display: 'flex',
          flex: 1,
        },

        '.ant-card-head-title': { display: 'flex', alignItems: 'center' }
      },

      '.ant-card-extra': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
      },

      '&.ant-card-bordered': {
        border,

        '.ant-card-head': { borderBottom: border },
      },

      '.ant-card-actions': {
        'background': fade(colors.gray.primary, 0.88),
        'li > span': { display: 'flex', justifyContent: 'center' }
      },

      '.ant-card-body': {
        padding: ' 4px 8px'
      },

      '&.content-type--table': {
        '.ant-card-body': { padding: '8px 0' }
      },

      '&.ant-card-hoverable': {
        cursor: 'default'
      }
    }
  };
};
