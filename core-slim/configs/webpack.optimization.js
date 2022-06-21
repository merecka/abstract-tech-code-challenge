const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const { context } = require('./constants');

/* create a cache group for each @abst pkg */
const { chunks } = require('./entrypoints');
const coreGroups = _.reduce(chunks, (memo, pkgName, dir) => {
  return {
    ...memo,
    [pkgName]: {
      chunks: 'all',
      // filename: `${_.trimStart(name, '@').replace('/', '_')}.js`,
      name: pkgName,
      priority: -10,
      reuseExistingChunk: true,
      test: new RegExp(`[\\/]packages/${dir}[\\/]`)
    }
  };
}, {});

/* create cache groups for cache groups for @src/* */
const src = path.resolve(context, 'src');
const srcDirs = _.filter(fs.readdirSync(src), (name) => {
  try {
    const stat = fs.statSync(path.resolve(src, name));
    return stat.isDirectory();
  } catch(e) { return false; }
});

/* split src into chunks for each directory */
const srcGroups = _.reduce(srcDirs, (memo, dir) => {
  const name = `@src/${dir}`;
  return { ...memo, [name]: {
    chunks: 'all',
    name,
    priority: -5,
    reuseExistingChunk: true,
    test: new RegExp(`[\\/]src/${dir}[\\/]`)
  }};
}, {});

/* create a vendor chunk to pick up anything DLL misses */
const vendors = {
  test: /[\\/]node_modules[\\/]/,
  name: 'vendors',
  chunks: 'all',
  reuseExistingChunk: true,
  priority: -4,
  enforce: true
};

const cacheGroups = { ...coreGroups, ...srcGroups, vendors };

module.exports = {
  minimize: false,
  namedChunks: true,
  namedModules: true,
  runtimeChunk: 'single',
  splitChunks: { // picks up anything missed by DLL
    chunks: 'all',
    maxInitialRequests: Infinity,
    minSize: 0,
    cacheGroups
  }
};
