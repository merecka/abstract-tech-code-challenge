export const callChain = (...fns) => (value) =>
  _.reduce(fns, (memo, fn) => { return fn ? fn(memo) : memo; }, value);
