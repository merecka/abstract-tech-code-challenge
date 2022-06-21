export const css = ({ colors, colorGrid, darkMode, fade, fonts }) => {
  const { canvas, info, gray,  primary, text } = colors;
  const { blue, blueGrey } = colorGrid;
  return {
    wpr: {
      // 'alignSelf': 'stretch',
      // 'display': 'flex',
      // 'flexDirection': 'column',

      /* normal text */
      'p': { color: text.primary, fontSize: 14, lineHeight: 1.25 },

      /* links */
      'a': { color: blue[500], textDecoration: 'underline' },

      /* headers */
      'h1, h2, h3, h4, h5, h6': { fontFamily: fonts.title },

      /* margins */
      'p, h1, h2, h3, h4, h5, h6': { marginBottom: 12 },

      /* code */
      ':not(pre)': {
        code: {
          fontSize: 13,
          lineHeight: 'inherit',
          backgroundColor: fade(info.primary, 0.88),
          color: info.primary,
          padding: '2px 3px',
          marginBottom: 'inherit'
        }
      },

      /* blockquote */
      'blockquote': {
        borderLeft: `1px solid ${blueGrey[300]}`,
        fontFamily: 'serif',
        padding: '8px 8px 8px 24px',
        marginBottom: 12,
        backgroundColor: fade(blueGrey[500], 88),
        borderRadius: '0 8px 8px 0',

        p: {
          color: blueGrey[darkMode ? 300 : 700],
          marginBottom: 0
        }
      },
      /* table */
      'table': {
        marginBottom: 2,
        width: '100%',

        thead: {
          tr: { borderBottom: `1px solid ${fade(gray.primary, 70)}` }
        },

        tbody: {
          tr: {
            '&:hover': {
              backgroundColor: fade(primary.primary, 88)
            },
          }
        },

        td: { cursor: 'default', padding: '6px 12px' },

        th: {
          'backgroundColor': fade(canvas.component),
          'color': text.primary,
          'cursor': 'default',
          'padding': '10px 12px',

          '&:first-child': { borderTopLeftRadius: 8 },
          '&:last-child': { borderTopRightRadius: 8 }
        },

        tr: {
          'backgroundColor': 'transparent',
          'padding': '0 6px',

          '&:nth-child(even)': { backgroundColor: fade(gray.light, 94) },
          '&:nth-child(odd)': { backgroundColor: fade(gray.light, 97) },
          '&:last-child': {
            td: {
              '&:first-child': { borderBottomLeftRadius: 8 },
              '&:last-child': { borderBottomRightRadius: 8 }
            }

          },

          '&:not(:last-child)': {
            borderBottom: `1px solid ${fade(gray.primary, 88)}`,
          }
        }
      },
      'hr': {
        borderColor: fade(gray.light, 70),
        margin: '16px 0'
      }
    },
  };
};
