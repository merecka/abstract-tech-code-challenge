const path = require('path');
const context = path.join(__dirname, '..', '..');

module.exports = {
  context,
  isDev: true,
  isProd: false,
  jsExt: 'js',
  mode: 'development',
  requireFromContext: (...args) => require(path.resolve(context, ...args))
};
