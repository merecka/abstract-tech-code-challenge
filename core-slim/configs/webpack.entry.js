const path = require('path');
const { context, requireFromContext } = require('./constants');
const { appEntry = 'src/index.js' } = requireFromContext('config');

const {
  DEV_SER_PROTOCOL: protocol = 'http',
  PUBLIC_HOST: host = 'localhost',
  PORT: port = '80'
} = process.env;

module.exports = {
  main: [
    `webpack-dev-server/client?${protocol}://${host}:${port}`,
    path.join(context, appEntry)
  ]
};
