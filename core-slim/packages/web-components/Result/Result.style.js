export const css = ({ fade, fonts, getColor }) => {
  return {
    result: {
      'width': '100%',
      '.container': {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
      },
      '.title': {
        alignItems: 'center',
        marginTop: 16,
        fontSize: 24,
        zIndex: 1,
        fontWeight: 'bolder',
        fontFamily: fonts.title
      },
      '.description': {
        alignItems: 'center',
        marginTop: 16,
        fontSize: 16,
        zIndex: 1,
      },
      '.action-btns-wpr': {
        marginTop: 16
      },

      '&.fill': {
        position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
        alignItems: 'center',
        display: 'flex',
        flex: '1 0 100%',
        width: '100%'
      },
      '&.layout-inset': {
        '.title': { marginTop: 0 },
        '.description': { marginTop: 0 },
        '.icon': {
          alignSelf: 'center',
          position: 'absolute',
          margin: 'auto',
          height: 'auto',
          width: 'auto',
          maxHeight: '75%',
          maxWidth: '80%',
          color: fade(getColor('text'), 96),
          zIndex: 0
        }
      },
      '&.layout-compact': {
        '.container': { flexDirection: 'row', padding: '6px 8px' },
        '.title': { marginTop: 0, fontSize: 18 }
      },
    }
  };
};
