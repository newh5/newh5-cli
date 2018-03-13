#!/usr/bin/env node --harmony
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var chalk = require('chalk');
var spawn = require('cross-spawn');

/**
 * luanch
 */
function luanch() {

  console.log(chalk.cyan('  Starting the development server...'));

  var result = spawn.sync('node', [require.resolve('./start.js')].concat(process.argv), {
    stdio: 'inherit'
  });
  process.exit(result.status);
}

/**
* @exports
* @param {Commander} commander 定义命令的基本类库实例
*/

exports.default = function (commander) {
  commander.command('start').description('run projects').action(function () {
    luanch();
  });
};