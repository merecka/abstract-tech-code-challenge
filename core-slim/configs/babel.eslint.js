const conf = require('./babel');
const _ = require('lodash');

module.exports = {
  ..._.omit(conf, ['cacheDirectory', 'env']),
  plugins: conf.env.production.plugins
};
