
export const fromPath = (obj, path) => {
  return _.get(obj, path);
  // let _path = path;
  // if (_.isString(path)) _path = _.toPath(path);
  //
  // return _.reduce(_path, (subObj, subPath) => {
  //   if (_.isNull(subObj)) return null;
  //   if (_.has(subObj, subPath)) return subObj[subPath];
  //   console.warn(`invalid sub-path ${subPath} found along path ${path}`);
  //   return null;
  // }, obj);
};
