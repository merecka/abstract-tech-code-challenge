export const css = (/* theme *//* , props */) => {
  return {
    wpr: {
      // border: '0.5px solid lightblue',
      alignSelf: 'center',
      flex: '0 1 auto',
      padding: '6px 0'
    },
    optGrid: {
      'flex': '1 1 90%',
      'flexFlow': 'row wrap',
      'alignContent': 'flex-start',
      'maxWidth': '100%',

      '.option-wpr': {
        'width': '33%',
        'margin': '0 -6px',
        'padding': '6px 12px',
        'flex': '1 1 33%',

        '.option': {
          flexDirection: 'column',
          alignItems: 'stretch',
          flex: '1 1 auto'
        }
      }
    }
  };
};
