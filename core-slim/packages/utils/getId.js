
function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
  .toString(16)
  .substring(1);
}
/**
 * @method getId
 * @memberof module:@abst/utils
 * @alias module:@abst/utils.getId
 * @desc context/platform-agnostic unique id generator.
 * @return {string} a very long, uuid-style id.
 */
export function getId(len = 8, exact = false) {
  const str = _.reduce(
    _.range(_.ceil(_.round(len) / 4)),
    (memo) => memo + s4(),
    ''
  );
  if (!!exact && !!(len % 4)) return str.slice(0, -1 * (len % 4));
  return str;
}
