export function getErrorMessage(error, prefix, fallback) {
  /* ensure additional args are passed if walking */
  const walk = (val) => getErrorMessage(val, prefix, fallback);

  /* walk array or straight nested error */
  if (_.isArray(error)) return walk(error[0]);
  if (_.has(error, ['error'])) return walk(error.error);
  if (_.has(error, ['messages'])) return walk(error.messages);

  if (!_.isString(fallback) && fallback !== false) {
    fallback = 'An Unknown Error has occurred.';
  }

  /* if fallback is explicitly false, return null; otherwise generate a msg */
  const fmt = (msg) => (_.isString(msg) || _.isString(fallback))
    ? `${_.isString(prefix) ? _.trim(prefix) + ': ' : ''}${msg || fallback}`
    : null;

  if (error === true) return fmt();
  if (_.isString(error)) return fmt(error);
  if (!!error && _.isObject(error)) {
    let msg;
    /* TODO: this should be more robust */
    if (_.isString(error.message)) msg = error.message;
    if (_.isString(error.msg)) msg = error.msg;
    return fmt(msg);
  }
  return fmt();
}
