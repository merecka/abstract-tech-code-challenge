import cn from 'classnames';

function pass() { return null; }
export function getTextProps(path, props, getStatusText = pass) {
  const { color, status } = props;
  /* extract prop */
  const prop = _.get(props, path);

  /* check for opt-out */
  if (prop === false) return null;

  const isObj = _.isPlainObject(prop);
  let val;

  /* extract value based on props */
  if (isObj) val = prop.children || prop.text;
  else if (_.isString(prop)) val = prop;
  /* generate a value */
  if (!val) val = getStatusText(status, props);
  if (!val) return null;
  /* return generated, allowing custom config to override */
  return {
    children: val,
    color,
    ...(isObj ? _.omit(prop, ['text']) : {}),
    className: cn(path, isObj && prop?.className)

  };
}
