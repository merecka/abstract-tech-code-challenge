const _ = require('lodash');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TagsPlugin = require('html-webpack-tags-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const ThemePlugin = require('./webpack.plugins.theme');
const { context, requireFromContext } = require('./constants');
const appConf = requireFromContext('config');
const env = _.omitBy(process.env, (val, key) => _.startsWith(key, 'npm'));
const { PROJECT_KEY, PROJECT_NAME, REACT_DEVTOOLS_URI } = env;

module.exports = [
  new HtmlWebpackPlugin({
    cache: true,
    filename: 'index.html',
    templateContent: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
        <div id="app"></div>
      </body>
    </html>
    `,
    title: PROJECT_NAME
  }),
  new TagsPlugin({
    append: false, // prepend instead
    publicPath: false,
    links: [{
      type: 'css',
      path: 'https://fonts.googleapis.com/css2?family=Big+Shoulders+Text:wght@100;200;400;500;700;900&family=Exo:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Bitter:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Inconsolata:wght@200;400;600;700;900&display=swap'
    }],
    scripts: _.compact([
      !!REACT_DEVTOOLS_URI ? { path: REACT_DEVTOOLS_URI, type: 'js' } : null
    ]),
  }),
  new webpack.DefinePlugin({
    'process.env': _.mapValues(env, (val) => JSON.stringify(val)),
    'process.__CONF': JSON.stringify(appConf)
  }),
  new webpack.ProvidePlugin({ _: 'lodash', $: 'jquery', jQuery: 'jquery' }),
  new webpack.LoaderOptionsPlugin({
    minimize: false,
    debug: true,
    options: { context }
  }),
  new WebpackPwaManifest({
    /* [START OPTIONS] */
    filename: 'manifest.json',
    inject: true,
    fingerprints: false,
    /* [END OPTIONS] */
    name: PROJECT_NAME,
    short_name: PROJECT_KEY,
    description: '',
    background_color: '#1B1B1B',
    icons: []
  }),
  ThemePlugin,
  new ReactRefreshWebpackPlugin({
    forceEnable: true,
    exclude: /dll|node_modules|dist/,
    overlay: false /* {
      sockHost: '0.0.0.0',
      sockIntegration: 'wds',
      sockPort: process.env.PORT
    } */
  })
];
