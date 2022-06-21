const AntDesignThemePlugin = require('antd-theme-webpack-plugin');
const path = require('path');
const { context } = require('../constants');
const themeVariables = require('./themeVariables');
const stylesDir = path.join(context, 'src', 'stylesheets');

module.exports = new AntDesignThemePlugin({
  antDir: path.join(context, '..', 'node_modules', 'antd'),
  generateOnce: false,
  stylesDir,
  varFile: path.join(stylesDir, 'vars', 'vars.less'),
  mainLessFile: path.join(stylesDir, 'index.less'),
  themeVariables,

  customColorRegexArray: [
    /^darken(.*)$/,
    /^desaturate(.*)$/,
    /^difference(.*)$/,
    /^fade(.*)$/,
    /^fadein(.*)$/,
    /^fadeout(.*)$/,
    /^lighten(.*)$/,
    /^saturate(.*)$/,
    /^spin(.*)$/
  ]
});
