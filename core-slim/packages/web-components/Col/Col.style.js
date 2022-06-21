const convertToFlex = (prop) => {
  switch(prop) {
    case 'start': case 'end': prop = `flex-${prop}`; break;
    case 'between': case 'around': prop = `space-${prop}`; break;
    case 'center': case 'initial': case 'inherit':
    default: break;
  }
  return prop;
};

export default (theme, props) => {
  const {
    align = 'start',
    autoSize = false,
    innerStyle,
    justify = 'stretch'
  } = props;
  let { style = {}} = props;
  if (autoSize) style = _.defaults(style, { padding: '0px 8px' });

  return {
    wrapper: {
      marginTop: 6,
      marginBottom: 6,
      transition: 'all 150ms ease-in-out',
      ...style
    },
    container: {
      height: align === 'start' ? 'auto' : '100%',
      alignItems: convertToFlex(justify),
      justifyContent: convertToFlex(align),
      flexDirection: 'column',
      ...innerStyle
    }
  };
};
