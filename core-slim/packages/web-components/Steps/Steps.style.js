export default (theme, { stepPosition }) => {
  return {
    wrapper: {
      flexDirection: _.includes(['bottom', 'right'], stepPosition)
        ? 'row-reverse' : 'row'
    },
    title: { color: 'inherit' },
    description: { color: 'inherit' }
  };
};
