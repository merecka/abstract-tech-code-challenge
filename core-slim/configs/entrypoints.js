const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const pkgsDir = path.resolve(__dirname, '..', 'packages');

const getPackageGlob = (name) => {
  const pkgDir = path.resolve(pkgsDir, name);
  const stat = fs.statSync(pkgDir);
  if (!stat.isDirectory()) throw new Error(`${name} is not a directory`);

  return {
    entry: { index: path.join(pkgDir, 'index.js') },       // entry configuration
    name,        // package name
    src: pkgDir          // entry directory
  };
};

const pkgs = fs.readdirSync(pkgsDir);
module.exports = _.reduce(
  pkgs,
  (memo, pDir) => {
    try {
      const { entry, name, src } = getPackageGlob(pDir);
      const pkgName = `@abst/${name}`;
      memo.chunks[name] = pkgName;
      memo.packages[pkgName] = src;
      if (!!entry?.index) memo.entrypoints[pkgName] = path.join(src, 'index.js');
    } catch(e) {/* ignore */}
    return memo;
  },
  { packages: {}, entrypoints: {}, chunks: {}}
);
