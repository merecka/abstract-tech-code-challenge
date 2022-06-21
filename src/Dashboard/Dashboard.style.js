export default (theme, /* , props */) => {
  const { colors: { text }, fade } = theme;
  return {
    viewWpr: {
      wpr: { flex: 1 },
      ctrColInner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '15vh'
      },

    },
    titleWpr: {},
    space: {
      height: 0.1,
      borderTop: `0.5px solid ${fade(text.hint, 70)}`,
      margin: '10px 0'
    }
  };
};
