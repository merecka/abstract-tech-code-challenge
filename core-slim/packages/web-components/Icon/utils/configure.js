import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import getPrefix from './getPrefix';
export default (name, weight) => {
  if (!name) return null;
  /* if name is explicitly an array, destructure and continue lookup  */
  if (_.isArray(name)) { weight = name[0]; name = name[1]; }
  /* remove override, but also don't do a lookup */
  if (_.startsWith(name, '!')) name = _.trimStart(name, '!');
  weight = getPrefix(weight);
  let exists = findIconDefinition({ prefix: weight, iconName: name });
  if (!exists) exists = findIconDefinition({ prefix: 'fab', iconName: name });
  if (!exists) { name = 'exclamation-circle'; weight = 'fas'; }
  return [weight, name];
};
