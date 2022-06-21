const path = require('path');
const dir = __dirname;
const context = path.resolve(dir, '..', '..');

require('@babel/register')({
  babelrc: false,
  cache: true,
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-export-default-from',
    ['@babel/plugin-proposal-optional-chaining', { loose: false }],
    ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: false }],
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-throw-expressions',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    '@babel/plugin-proposal-json-strings',
  ],
  presets: [
    ['@babel/env', {
      corejs: '3.21',
      targets: { node: '16' },
      modules: 'auto',
      useBuiltIns: 'entry'
    }],
  ],
  only: [
    new RegExp(path.resolve(context, 'config.js')),
    new RegExp(dir)
  ],
  ignore: [/node_modules/],
  root: dir
});


(async() => {
  try {
    await import(`./${process.env.NODE_ENV}.js`);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
})();
