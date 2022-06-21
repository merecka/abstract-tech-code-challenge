export const callAll = (...fns) => (...args) => {
  _.forEach(fns, (fn) => fn && fn(...args));
};
