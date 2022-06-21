const layouts = ['row', 'column'];

export default (theme, props) => {
  const {
    absoluteFill,
    contentPadding,
    fonts,
    getColor,
    safeAreaBottom,
    safeAreaTop,
    screenHeight,
    screenWidth
  } = theme;
  const { color: clr, fullScreen, layout, size } = props;
  const flexDirection = _.includes(layouts, layout)
    ? layout
    : fullScreen ? 'column' : 'row';
  const isRow = flexDirection === 'row';
  const color = getColor(clr);
  return {
    wpr: {
      ...absoluteFill,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: contentPadding,
      zIndex: 999999,
      ...(fullScreen ? {
        paddingBottom: safeAreaBottom,
        paddingTop: safeAreaTop,
        height: screenHeight,
        width: screenWidth
      } : {}),
    },
    contentWpr: { flexDirection },
    spinnerWpr: !fullScreen || isRow ? {} : {
      flex: 1,
      justifyContent: 'flex-end'
    },
    titleWpr: isRow ? {
      paddingLeft: contentPadding
    } : {
      flex: 1,
      justifyContent: 'flex-end',
      paddingBottom: contentPadding * 2,
    },
    title: {
      color,
      fontFamily: fonts.title,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      fontSize: size === 'large'
        ? isRow ? 26 : 20
        : 14
    }
  };
};
