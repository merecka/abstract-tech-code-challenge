const exactMap = {
  'dashboard': 'home',
  'estimator': 'calculator-alt',
  'auth': 'users',
  'access controls': 'user-lock',
  'catalog': 'book',
  'epicor': 'cogs',
  'website content': 'paragraph',
  'customers': 'user-crown',
  'settings': 'cog',
  'marketing': 'bullhorn',
  'tracking': 'mouse-pointer'
};

/* NOTE: iterator reads keys sequentially. Don't alphabetize keys, MATT! */
const partialMatchMap = {
  data: 'database',
  order: 'tags',
  sales: '!badge-dollar',
  users: 'users',
  user: 'user',
  organization: 'building'
};

export const getMenuIcon = (_label) => {
  const label = _.toLower(_label);
  const includes = (val) => _.includes(label, val);

  /* explicit override */
  if (_.has(exactMap, [label])) return exactMap[label];
  const partial = _.find(partialMatchMap, (val, key) => includes(key));
  if (partial) return partial;
  return label;
};
