export default (theme, props) => {
  const {
    closed,
    duration,
    gutter = 16,
    maxWidth,
    position = 'right',
    style,
    transitionType = 'ease-in-out',
    transitioning,
    width,
    wrapperStyle
  } = props;

  return {
    wpr: {
      [`margin${ position === 'left' ? 'Right' : 'Left'}`]: closed ? 0 : gutter,
      transition: `all ${duration}ms ${transitionType}`,
      overflowX: transitioning || closed ? 'hidden' : 'visible',
      maxWidth,
      ...wrapperStyle,
      width
    },
    ctr: { flex: '1 1 100%', maxWidth, ...style }
  };
};
