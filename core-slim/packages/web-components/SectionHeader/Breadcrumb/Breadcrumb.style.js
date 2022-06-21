export default () => ({
  wrapper: { alignItems: 'center', marginBottom: 0 },
  container: { paddingLeft: 0 },
  crumbWrapper: { marginLeft: '0.125rem' },
  separator: { alignSelf: 'center', padding: '0 8px' },
  crumb: {
    alignSelf: 'center',
    padding: '0.25rem 0.33rem',
    minWidth: 0,
    lineHeight: 1
  },
  lastCrumb: {
    alignSelf: 'center',
    textTransform: 'capitalize',
    letterSpacing: 0
  },
  iconCrumb: {
    alignSelf: 'center',
    minHeight: 28,
    width: 26,
    height: 28,
    marginRight: '-4px'
  }
});
