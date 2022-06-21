export const css =  (theme, { sidebarClosedWidth }) => {
  const {
    colors: { canvas },
    drawerTransitionDuration: dDur,
    drawerWidth,
    navBarHeight,
  } = theme;
  return {
    wpr: {
      'backgroundColor': canvas.primary,
      'display': 'flex',
      'flexDirection': 'column',
      'height': '100vh',
      'flex': 1,

      '.top-nav-wpr': {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: navBarHeight,
        zIndex: 100
      },

      '.app-ctr': {
        display: 'flex',
        flex: '1 1 100%',
        paddingTop: navBarHeight,
        width: '100vw',
        height: '100vh',
      },

      '.sidebar-wpr': {
        position: 'absolute',
        top: navBarHeight,
        bottom: 0,
        left: 0,
        right: sidebarClosedWidth,
        overflowX: 'visible'
      },

      '.content-wpr': {
        transition: `all ${dDur}ms ease-in-out`,
        marginLeft: sidebarClosedWidth,
        flex: '1 1 100%',
        overflow: 'hidden',
        position: 'relative',
        width: '100vw',
        justifyContent: 'center',
        transform: 'translate(0px)'
      },

      '.content-ctr': {
        margin: '0 -8px',
        padding: '0 16px',
        flex: '1 1 100%',
        height: `calc(100vh - ${navBarHeight}px)`,
        maxWidth: 1920
      },

      '&.sidebar-open': {
        '.content-wpr': {
          transform: `translate(${drawerWidth - sidebarClosedWidth}px)`
        }
      }
    },

  };
};
