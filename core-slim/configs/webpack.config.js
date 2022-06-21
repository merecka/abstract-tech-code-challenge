const path = require('path');
const devServer = require('./webpack.devServer');
const entry = require('./webpack.entry');
const plugins = require('./webpack.plugins');
const rules = require('./webpack.rules');
const optimization = require('./webpack.optimization');
const { context, dist, isDev } = require('./constants');
const { packages } = require('./entrypoints');

const conf = {
  context,
  devServer,
  devtool: isDev && 'eval',
  entry,
  mode: isDev ? 'development' : 'production',
  module: { rules },
  node: {
    child_process: 'empty', dgram: 'empty', fs: 'empty', net: 'empty', tls: 'empty'
  },
  optimization,
  output: {
    filename: '[name].js',
    path: dist,
    publicPath: '/'
  },
  plugins,
  resolve: {
    alias: {
      '@abst/config': path.resolve(context, 'config'),
      ...packages,
      '@src': path.resolve(context, 'src')
    },
    extensions: ['.js', '.json', '.jsx'],
    modules: ['node_modules'],
    symlinks: true
  }
};

module.exports = conf;
