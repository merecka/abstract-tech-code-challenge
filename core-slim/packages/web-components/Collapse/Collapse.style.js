
export default (theme, { containerStyle, style, transition, wrapperStyle }) => {
  return {
    container: ({ totallyOpen }) => ({
      overflowY: totallyOpen ? 'visible' :  'hidden',
      ...containerStyle,
      ...style,
    }),
    wrapper: ({ height, totallyOpen }) => ({
      overflowY: totallyOpen ? 'visible' : 'hidden',
      height,
      ...wrapperStyle,
      transition: `height ${transition || '.25s ease-in-out'}`
    })
  };
};
