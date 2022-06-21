const validateReducer = (memo, fn, name) => {
  if (memo) return memo;
  if (!_.isFunction(fn)) return `HubXrStorage driver validation failed; ${name}`;
  return null;
};

export function validateAdapter(driver) {
  /* typecheck */
  if (!driver) return 'HubXrStorage requires a storage driver';
  if (!_.isObject(driver)) return `Invalid driver type ${typeof driver}`;

  const { getItem, setItem } = driver;
  return _.reduce({ getItem, setItem }, validateReducer, null);
}
