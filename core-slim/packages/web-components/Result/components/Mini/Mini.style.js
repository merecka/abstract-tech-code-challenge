export default (/* theme, props */) => {
  return {
    container: { width: 'fit-content' },
    wrapper: {
      flexDirection: 'column',
      padding: '1rem 2rem'
    },
    title: {
      justifyContent: 'center'
    },
    description: {
      marginBottom: 8
    },
    buttons: {
      justifyContent: 'center'
    },
    button: {
      margin: '0 4px'
    },
    icon: { marginRight: 8 },
  };
};
