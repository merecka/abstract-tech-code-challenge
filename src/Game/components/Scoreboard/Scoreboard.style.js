


export const css = (theme) => {
  const {
    colors: { gray, secondary, text },
    fade,
    fonts
  } = theme;

  return {
    wpr: {
      'position': 'absolute',
      'top': 0,
      'bottom': 0,
      'left': 0,
      'right': 0,
      'flex': '1 0 auto',
      'overflow': 'hidden',
      'flexDirection': 'column',
      'alignItems': 'center',
      'padding': '8px 4px',

      '.core-text': { flex: '0 1 auto', fontWeight: 'inherit' },
      '.round': { lineHeight: 1 },
      '.total-score': { fontWeight: 200 }
    },
    list: {
      'flex': '1 1 100%',
      'flexDirection': 'column',
      'alignSelf': 'stretch',
      'overflowY': 'scroll',

      '.list-item': {
        'height': 50,
        'alignItems': 'center',
        'padding': '8px 4px',
        'justifyContent': 'space-between',

        '.core-text': { fontFamily: 'inherit' },

        '.data-wpr': {
          'alignItems': 'center',
          'fontFamily': fonts.title,

          '.player-num-wpr': {
            'width': 24,
            'backgroundColor': gray.primary,
            'color': text.inverse,
            'border': `0.5px solid ${gray.dark}`,
            'marginRight': 6,
            'alignSelf': 'stretch',
            'alignItems': 'center',
            'justifyContent': 'center',

            '.player-num': {
              letterSpacing: 0,
              fontKerning: 0,
              fontWeight: 900,
              lineHeight: '9px',
              marginTop: 2,
              fontFamily: fonts.display,
              textAlign: 'center',
            }
          },

          '.data-ctr': {
            'flexDirection': 'column',

            '.primary': {
              'flex': 1,
              'alignItems': 'center',

              '.player-name': { lineHeight: 1 }
            },

            '.secondary': {
              'fontSize': 11,
              'fontWeight': 200,
              'alignSelf': 'stretch',
              'flex': 1,

              '.position': { marginRight: 4 }
            }
          }
        },
        '&:not(:last-child)': {
          borderBottom: `0.5px solid ${fade(secondary.dark)}`
        },

      }
    }
  };
};
