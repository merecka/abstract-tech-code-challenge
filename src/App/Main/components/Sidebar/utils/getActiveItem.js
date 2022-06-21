
const findIndex = (itms, ref) => _.findIndex(itms, (item) => {
  let path = item.path || item._key;
  if (!_.isString(path)) return false;
  path = _.trimStart(path, '/');

  if (_.isEmpty(path)) return path === ref;

  const reg = new RegExp(path, 'gi');
  return reg.test(ref);
});

export default (items, activeModule, activePath) => {
  const activeParent = findIndex(items, activeModule);
  if (!_.isFinite(activeParent) || activeParent < 0) return [-1, -1];

  let activeChild = -1;
  const { subNav = [], routes = subNav } = items[activeParent];
  if (!!activePath && !!routes?.length) {
    activeChild = findIndex(routes, activePath);
  }
  return [activeParent, activeChild];
};
