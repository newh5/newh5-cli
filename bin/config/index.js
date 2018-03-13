'use strict';

var path = require('path');
var fs = require('fs');
var chalk = require('chalk');
var _ = require('lodash');

var _require = require('../tools/utils.js'),
    isExist = _require.isExist;

var defaultConfig = require('./default.js');

var _require2 = require('./const.js'),
    CONFIG_FILENAME = _require2.CONFIG_FILENAME;

var config = {};

var appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}
function resolveOwn(relativePath) {
  return path.resolve(__dirname, '..', relativePath);
}

var configPath = resolveApp(CONFIG_FILENAME);
try {
  if (isExist(configPath, 'file')) {
    config = require(configPath);
  }
} catch (err) {
  console.log('');
  console.log('Load config file: ' + chalk.cyan(configPath) + ' occur error!');
  console.log('');
  console.error(err);
  process.exit(1);
}

module.exports = _.merge(defaultConfig, config);