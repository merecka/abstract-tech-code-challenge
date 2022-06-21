export default () => {
  return {};
};

export const css = (theme, { closedWidth }) => {
  const { colors, fade, fonts, drawerWidth, drawerTransitionDuration } = theme;
  const transition = `all ${drawerTransitionDuration}ms ease-in-out`;
  // const activeColor = isChild ? colors.brand.secondary : colors.brand.primary;
  const { canvas, primary, secondary } = colors;


  return {
    menu: {
      'flexDirection': 'column',
      transition,
      'width': closedWidth,

      '.menu-ctr': {
        backgroundColor: canvas.component,
        flex: 1,
        flexDirection: 'column',
        overflowX: 'hidden',
        justifyContent: 'center',
        paddingBottom: '20vh',
        transition,
        width: '100%',
        zIndex: 99
      },

      '.sidebar-menu-item': {
        'alignItems': 'center',
        'cursor': 'pointer',
        'padding': '6px 0',

        '.inkbar': {
          alignSelf: 'stretch',
          backgroundColor: primary.primary,
          borderRadius: '0 8px 8px 0',
          height: '100%',
          transition,
          width: 0
        },

        '.inkbar-placeholder': {
          transition,
          width: 4
        },

        '.itm-icon-wpr': {
          'alignItems': 'center',
          'justifyContent': 'center',
          'marginLeft': -4,
          'padding': '0 4px',
          transition,
          'width': 60,

          '.icon': {
            cursor: 'inherit', marginLeft: 0,
            fontSize: 18

          },
        },

        '.title-wpr': {
          'alignItems': 'center',
          'flex': 1,
          'justifyContent': 'space-between',

          '.title': {
            cursor: 'inherit',
            fontFamily: fonts.title,
            fontWeight: 'regular'
          },
        },
        '.open-icon': {
          transition,
          marginRight: 12,
          transform: 'rotate(0deg)',
        },

        '&.is-open-parent .open-icon': {
          transform: 'rotate(180deg)',
        },


        /* *************************************************** ACTIVE STATE */
        '&.is-active': {
          '.inkbar': { width: 4 },
          '.inkbar-placeholder': { width: 0 },

          '.icon': {
            'color': primary.primary,
            '&.is-child': { color: secondary.primary }
          },

          '.title': {
            'fontWeight': 'bold',
            'color': primary.primary,
            '&.is-child': { color: secondary.primary }
          }
        },

        /* ********************************************************* CHILDREN */
        '&.is-child': {
          'backgroundColor': fade(secondary.primary, 0.96),
          'borderBottom': `1px solid ${fade(secondary.primary)}`,
          'borderRight': `1px solid ${fade(secondary.primary)}`,

          '.icon': { marginLeft: 12 },

          '&:first-child': { borderTopRightRadius: '8px' },
          '&:last-child': { borderBottomRightRadius: '8px' }
        },

      },
      /* ******************************************************* SIDEBAR OPEN */
      '&.sidebar-open': {
        'width': drawerWidth,
        '.menu-ctr': {
          backgroundColor: 'transparent'
        },
        '.sidebar-menu-item .itm-icon-wpr': {
          'width': 38,
          'marginLeft': 0,
          '&.is-child': { width: 50 }
        }
      }
    }
  };
};
