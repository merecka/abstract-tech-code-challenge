
export default({ navBarHeight }, { style, wrapperStyle, styles }) => ({
  wrapper: {
    flexDirection: 'column',
    flex: 1,
    alignSelf: 'stretch',
    alignContent: 'center',
    width: '100%',
    maxWidth: 1760,
    padding: '1rem 1.25rem',
    display: 'flex',
    minHeight: `calc(100vh - ${navBarHeight}px)`,
    ...wrapperStyle,
    ...styles?.wpr
  },
  secHeadWpr: {
    flex: '0 1 auto',
    ...styles?.secHeadWpr
  },
  secHead: {
    marginBottom: 0,
    ...styles?.secHead
  },
  container: {
    alignItems: 'stretch',
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    ...style,
    ...styles?.ctr
  },
  ctrCol: {
    flex: 1,
    display: 'flex',
    ...styles?.ctrCol
  },
  ctrColInner: {
    alignItems: 'stretch',
    alignSelf: 'stretch',
    flexDirection: 'column',
    display: 'flex',
    height: 'auto',
    flex: 1,
    maxWidth: '100%',
    ...styles?.ctrColInner
  }
});
