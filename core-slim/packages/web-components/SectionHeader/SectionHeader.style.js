
export default ({ colors, getColor, fade, fonts }, props) => {
  const { canvas } = colors;
  const {
    bordered = true,
    borderWidth = bordered ? 1 : 0,
    subsection = false,
    subSection = subsection,
    borderColor = fade(canvas.inverse, subSection ? 75 : 50),
    color: _color, headerStyle,
    style, titleStyle, wrapperStyle
  } = props;
  const textColor = _color ? _color : subSection ? 'text.hint' : 'text';
  const fontSize = subSection ? 18 : 22;
  const color = getColor(textColor);
  const borderClr = getColor(borderColor);
  return {
    wrapper: {
      alignItems: 'center',
      borderBottomColor: borderClr,
      borderBottomStyle: 'solid',

      borderBottomWidth: `${bordered ? borderWidth : 0}px`,
      marginBottom: 6,
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      ...wrapperStyle,
      ...headerStyle,
      ...style
    },
    titleWrapper: { marginBottom: 2, flexWrap: 'wrap' },
    titleWrapperInner: {},
    titleContainer: { flex: 1, paddingBottom: 0 },
    titleText: {
      color,
      fontSize,
      // fontWeight: '400',
      fontFamily: fonts.title,
      lineHeight: subSection ? 1.25 : 1.5,
      ...titleStyle,
      flexWrap: 'wrap',
      display: 'inline',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'flex-end',
    },
    subtitleWrapper: {
      display: 'inline-flex',
      alignSelf: 'center',
      height: '100%'
    },
    subtitleText: {
      borderLeft: `1px solid ${fade(color, 0.33)}`,
      color: fade(color, 0.33),
      fontSize: fontSize - 4,
      fontWeight: '200',
      paddingLeft: 8,
      marginLeft: 8,
      letterSpacing: 0,
      flexWrap: 'wrap'
    },
    actionButtonWrapper: { marginBottom: 4, padding: '0px 0px' },
    actionButtonContainer: {}
  };
};
