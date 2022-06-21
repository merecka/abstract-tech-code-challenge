const { context } = require('./constants');
module.exports = {
  'client': {
    logging: 'error',
    overlay: false,
    progress: true,
    reconnect: true,

  },
  'headers': {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE'
  },
  'historyApiFallback': true,
  'host': '0.0.0.0',
  'hot': true,
  'port': process.env.PORT || 8080,
  'devMiddleware': {
    stats: {
      all: false,
      assets: true,
      assetsSort: 'field',
      builtAt: false,
      cached: false,
      cachedAssets: false,
      children: false,
      chunks: false,
      chunkGroups: false,
      chunkModules: false,
      chunkOrigins: false,
      chunksSort: 'field',
      context,
      colors: true,
      depth: false,
      entrypoints: false,
      env: false,
      errors: true,
      errorDetails: true,
      hash: false,
      hot: true,
      maxModules: 7,
      modules: false,
      modulesSort: 'field',
      moduleTrace: true,
      performance: true,
      providedExports: false,
      publicPath: false,
      reasons: false,
      source: false,
      timings: true,
      usedExports: false,
      version: false,
      warnings: false
    }
  },
  'static': {
    publicPath: '/',
  },
  'watchFiles': {
    options: {
      aggregateTimeout: 1000,
      ignored: /dll|node_modules|dist/,
      // poll: 2000
    }
  }
};
