#!/usr/bin/env node --harmony
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var path = require('path');
var fs = require('fs-extra');
var chalk = require('chalk');
var download = require('download-git-repo');
var inquirer = require('inquirer');
var ora = require('ora');

var _require = require('../../config/const.js'),
    CONFIG_FILENAME = _require.CONFIG_FILENAME;

/**
 * 
 * @param {*} commander 
 */


function run(commander) {

  var destPath = commander.destPath || '.';
  var isCurrent = destPath === '.';
  destPath = path.resolve(destPath);

  var template = 'base'; // default use `base` template
  if (commander.template) template = commander.template;
  var isUseDefault = !~template.indexOf('/');
  if (isUseDefault) template = 'newh5-templates/' + template;

  var clone = commander.clone || false;

  if (fs.existsSync(destPath)) {
    inquirer.prompt([{
      type: 'confirm',
      message: isCurrent ? 'Init project in current directory ?' : 'Target directory already exists. Are you continue ?',
      name: 'ok'
    }]).then(function (answers) {
      if (answers.ok) initFiles(template, destPath);
    });
  } else {
    initFiles(template, destPath);
  }

  /**
   * 
   * @param {*} from 
   * @param {*} to 
   */
  function initFiles(from, to) {
    var spinner = ora('Downloading template').start();
    download(from, to, { clone: clone }, function (err) {
      spinner.stop();
      if (err) {
        console.log('');
        console.log('  Failed to download repo ' + chalk.red(template) + ': ' + err.message.trim());
        console.log('');
      } else {
        // copy default config file
        if (isUseDefault) {
          var defualtConfigPath = path.join(__dirname, '../../settings/default.out.js');
          var destConfigPath = path.join(to, CONFIG_FILENAME);
          fs.copySync(defualtConfigPath, destConfigPath);
        }

        console.log('');
        console.log('  Base on ' + chalk.green(template) + ' init project success');
        console.log('');
        if (commander.destPath) {
          console.log(chalk.cyan('  $ cd ' + commander.destPath + ' && npm install'));
        } else {
          console.log(chalk.cyan('  $ npm install'));
        }
        console.log(chalk.cyan('  $ newh5 start'));
        console.log('');
      }
    });
  }
}

/**
* @exports
* @param {Commander} commander 定义命令的基本类库实例
*/

exports.default = function (commander) {
  commander.command('init').description('init projects').option('-p --destPath', 'set dest path when init').option('-t, --template <template>', 'set template when init').option('-c, --clone', 'use git clone').action(function () {
    run(commander);
  });
};