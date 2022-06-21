import flat, { unflatten as unflat } from 'flat';

const handle = (data, isUnflat) => {
  const perform = isUnflat ? unflat : flat;
  const handleOne = (item) => Promise.resolve(perform(item, { maxDepth: 3 }));

  if (_.isArray(data)) return Promise.all(_.map(data, handleOne));
  return handleOne(data);
};

export const flatten = (data) => handle(data);
export const unflatten = (data) => handle(data, true);
