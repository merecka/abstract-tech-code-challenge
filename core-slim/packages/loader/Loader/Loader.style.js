export default (theme, props) => {
  const { colorGrid: { grey }, fade, getColor } = theme;
  const {
    backgroundColor = grey[500],
    foregroundColor = backgroundColor,
    fullScreen
  } = props;

  return {
    backgroundColor: fade(getColor(backgroundColor), 94),
    foregroundColor: fade(getColor(foregroundColor), 91),
    wpr: {
      margin: 0,
      position: fullScreen ? 'fixed' : 'relative',
      zIndex: 100
    }
  };
};
export const css = (theme, { style }) => {
  return {
    wpr: {
      'alignItems': 'center',
      'display': 'flex',
      'flex': '1 0 100%',
      'justifyContent': 'center',
      'height': '100%',

      '&.fullScreen, &.fill': {
        position: 'absolute',
        bottom: 0,
        height: '100%',
        left: 0,
        right: 0,
        top: 0,
        width: '100%',
        zIndex: 100000
      },

      '&.spinner-bar': {
        'flexDirection': 'column-reverse',
        '.title': { marginBottom: 6, marginLeft: 0 },
      }
    },
    loaderWpr: {
      flex: 1,
      width: '100%',
      height: 'auto',
      minHeight: '100%',
      ...style
    },
    title: {
      // color: text.primary,
      lineHeight: 1,
      marginLeft: 12
    }
  };
};
