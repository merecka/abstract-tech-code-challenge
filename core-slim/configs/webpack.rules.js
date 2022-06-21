const babelConf = require('./babel');
const postcssPresetEnv = require('postcss-preset-env');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');

const cssLoaders = [
  { loader: 'style-loader', options: {}},
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      plugins: () => [
        postcssPresetEnv({ browsers: '>.5% or last 2 versions' }),
        postcssFlexbugsFixes({})
      ]
    }
  }
];

module.exports = [{
  test: /\.css$/,
  exclude: /\.useable\.css$/,
  use: cssLoaders
}, {
  test: /\.less$/,
  use: [ ...cssLoaders, {
    loader: 'less-loader',
    options: { lessOptions: { javascriptEnabled: true, relativeUrls: true }}
  }]
}, {
  test: [/\.js$/, /\.js$/, /\.jsx$/],
  enforce: 'pre',
  exclude: [/node_modules/],
  use: ['source-map-loader'],
}, {
  test: [/\.js$/, /\.jsx$/],
  exclude: [/node_modules/],
  use: {
    loader: 'babel-loader',
    options: babelConf,
  },
}, {
  test: /\.(jpe?g|png|gif|svg|eot|ttf|woff|woff2)$/,
  use: [{
    loader: 'url-loader',
    options: { limit: 400000, name: '[name]-[hash].[ext]' }
  }]
}];
