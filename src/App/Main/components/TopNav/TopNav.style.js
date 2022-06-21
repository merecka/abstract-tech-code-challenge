export default (theme, { sidebarIsOpen: open }) => {
  const {
    darkMode, fonts, logoSrc, navBarHeight,
    drawerTransitionDuration: dDur,
    colors: { brand, canvas, text }
  } = theme;
  const duration = dDur * 1.5 / 1000;

  const bgColor = canvas.primary;
  const color = darkMode ? text.primary : brand.primary;
  const easing = 'cubic-bezier(0.4, 0, 0.2, 1)';
  const transition = `all ${duration}s ${easing}`;

  return {
    duration,
    easing,
    iconColor: color,
    wpr: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      height: navBarHeight,
      justifyContent: 'space-between',
      backgroundColor: bgColor,
      zIndex: 2
    },
    secWpr: { alignItems: 'center' },
    iconWpr: {
      backgroundColor: open ? 'transparent' : canvas.component,
      height: navBarHeight,
      width: 60,
      zIndex: 99,
      transition,
      alignItems: 'center',
      justifyContent: 'center'
    },
    icon: {
      height: navBarHeight
    },
    // preLogoSpace: { width:  },
    logo: { maxHeight: '24px' },
    logoWpr: {
      cursor: 'pointer',
      marginRight: 8,
      marginLeft: open ? -10 : 8,
      transition,
      backgroundColor: bgColor,
      zIndex: 3
    },
    logoSrc,
    title: {
      flex: 1,
      fontFamily: fonts.title,
      fontWeight: 400,
      textTransform: 'capitalize',
      color,
      letterSpacing: '0px',
      fontSize: 18,
      transition,
      marginLeft: open ? 0 : '-100%',
      zIndex: 0
    },
    rightWpr: {
      alignItems: 'center',
      paddingRight: 12
    }
  };
};
