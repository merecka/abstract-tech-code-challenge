export const getDefaultValues = (fieldConfig, fallback) => {
  const defaults = _.mapValues(fieldConfig, ({ options }) => {
    switch (true) {
      case !_.isUndefined(options.default): return options.default;
      case (
        !_.isUndefined(options.defaultValue) && options.defaultValue !== ''
      ):
        return options.defaultValue;
      case !_.isUndefined(options, 'fallbackDefault'):
        if (_.isFunction(options.fallbackDefault)) {
          return options.fallbackDefault(options);
        } return options.fallbackDefault;
      default: return fallback;
    }
  });
  return _.omitBy(defaults, _.isUndefined);
};
