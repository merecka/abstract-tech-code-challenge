const _ = require('lodash');

const plugins = [
  '@babel/plugin-transform-runtime',
  ['babel-plugin-import', { libraryName: 'antd', libraryDirectory: 'es', style: false }],
  '@babel/plugin-proposal-export-default-from',
  ['@babel/plugin-proposal-optional-chaining', { loose: false }],
  ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: false }],
  '@babel/plugin-proposal-do-expressions',
  '@babel/plugin-proposal-export-namespace-from',
  '@babel/plugin-proposal-numeric-separator',
  '@babel/plugin-proposal-throw-expressions',
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-syntax-import-meta',
  ['@babel/plugin-proposal-class-properties', { loose: false }],
  '@babel/plugin-proposal-json-strings',
];

module.exports = {
  babelrc: false,
  ignore: [/node_modules/, /core\.dll/],
  presets: [
    '@babel/react',
    ['@babel/env', {
      corejs: '3.21',
      targets: { browsers: 'last 2 versions, > 1%' },
      useBuiltIns: 'entry'
    }]
  ],
  env: {
    development: { plugins: _.concat([], plugins, require.resolve('react-refresh/babel')) },
    staging: { plugins },
    production: { plugins }
  }
};
