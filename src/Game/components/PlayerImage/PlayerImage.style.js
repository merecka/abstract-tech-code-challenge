import chroma from 'chroma-js';

export const css = (theme, { maxHeight, teamColors }) => {
  const {
    colors: { brand, gray, text },
    fade
  } = theme;
  const clrs = teamColors || brand;
  const Primary = chroma(clrs.primary);
  const Secondary = chroma(clrs.secondary);

  const scale = chroma.scale([
    Secondary.set('hsl.l', 0.5),
    Secondary.set('hsl.l', 0.3),
    Primary.set('hsl.l', 0.2),
    Primary.set('hsl.l', 0.05)
  ])
  .cache(false)
  .mode('lab')
  .gamma(0.4)
  .domain([0.25, 0.8, 1])
  .padding([0, 0.2])
  .colors(5)
  .join(',');

  const shadowClr = fade(gray.darkest);

  return {
    wpr: {
      'background': `linear-gradient(${scale})`,
      'transition': 'all 200ms ease-in-out',
      'filter': 'grayscale(85%) brightness(120%)',
      'paddingTop': '1rem',
      'height': '100%',
      'alignSelf': 'stretch',

      '.cheat': {
        filter: 'none',
        position: 'absolute',
        top: 5,
        left: 0,
        right: 0,
        height: 10,
        textAlign: 'center',
        color: text.inverse,
        textShadow: `0px 0px 3px ${gray.darker}`
      },

      'img': {
        margin: '0 auto',
        maxHeight,
        maxWidth: '100%',
        filter: 'grayscale(100%)',
      },

      '&.no-bg': { background: 'none', boxShadow: 'none' },
      '&.shadow': {
        boxShadow: `\
          2px -1px 6px 2px ${shadowClr},\
          -2px 1px 6px 2px ${shadowClr}
        `,
      },

      '&:hover': {
        'cursor': 'pointer',
        'filter': 'revert',
        'img': { filter: 'revert' },
        '&:not(.no-bg)': {
          '&.shadow': {
            boxShadow: `\
              3px -3px 12px 1px ${Secondary.css()},\
              -3px 3px 12px 1px ${Primary.css()}
            `,
          },
        },
        '&:active': {
          'filter': 'brightness(80%)',
          'transition': 'all 1ms ease-in-out',

          '&.shadow': {
            boxShadow: `\
              1px -1px 8px 1px ${Secondary.darken(1).css()},\
              -1px 1px 8px 1px ${Primary.darken(1).css()}
            `,
          }
        }
      }
    }
  };
};
