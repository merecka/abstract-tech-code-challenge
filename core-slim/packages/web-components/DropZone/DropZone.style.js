
export default ({ colors }, { minHeight = 350, style, cardStyle }) => {
  return {
    wpr: {
      border: `1px dashed ${colors.tertiary.lighter}`,
      backgroundColor: colors.canvas.component,
      display: 'flex',
      flex: 1,
      ...style,
      minHeight,
    },

    body: {
      alignSelf: 'stretch',
      alignItems: 'center',
      cursor: 'pointer',
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'column',
    },
    wprAccept: {},
    wprDisabled: {},
    wprReject: {},

    ctr: {
      background: 'none',
      display: 'flex',
      cursor: 'pointer !important',
      alignSelf: 'stretch',
      alignItems: 'center',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      ...cardStyle
    },

    title: {
      cursor: 'inherit',
      textTransform: 'capitalize'
    },
    subtitleWpr: {
      marginTop: '0.5rem',
      alignItems: 'center',
      backgroundColor: colors.brand.primary,
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      boxShadow: `\
    0px 1px 3px 0px rgba(0, 0, 0, 0.2), \
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), \
    0px 2px 1px -1px rgba(0, 0, 0, 0.12)
  `
    },
    icon: {
      marginRight: '1rem'
    },
    subtitle: {
      cursor: 'inherit',
      textTransform: 'none',
      fontSize: '1.5rem'
    },
  };
};
