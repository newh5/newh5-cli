#!/usr/bin/env node --harmony
'use strict';

var path = require('path');
var fs = require('fs-extra');
var chalk = require('chalk');
var program = require('commander');
var download = require('download-git-repo');
var inquirer = require('inquirer');
var ora = require('ora');

var _require = require('../config/const.js'),
    CONFIG_FILENAME = _require.CONFIG_FILENAME;

program.option('-t, --template <template>', 'set template when init').option('-c, --clone', 'use git clone').parse(process.argv);

var destPath = program.args[0] || '.';
var isCurrent = destPath === '.';
destPath = path.resolve(destPath);

var template = 'base'; // default use `base` template
if (program.template) template = program.template;
var isUseDefault = !~template.indexOf('/');
if (isUseDefault) template = 'newh5-templates/' + template;

var clone = program.clone || false;

if (fs.existsSync(destPath)) {
  inquirer.prompt([{
    type: 'confirm',
    message: isCurrent ? 'Init project in current directory ?' : 'Target directory already exists. Are you continue ?',
    name: 'ok'
  }]).then(function (answers) {
    if (answers.ok) init(template, destPath);
  });
} else {
  init(template, destPath);
}

function init(from, to) {
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
        var defualtConfigPath = path.join(__dirname, '../config/default.out.js');
        var destConfigPath = path.join(to, CONFIG_FILENAME);
        fs.copySync(defualtConfigPath, destConfigPath);
      }

      console.log('');
      console.log('  Base on ' + chalk.green(template) + ' init project success');
      console.log('');
      if (program.args[0]) {
        console.log(chalk.cyan('  $ cd ' + program.args[0] + ' && npm install'));
      } else {
        console.log(chalk.cyan('  $ npm install'));
      }
      console.log(chalk.cyan('  $ newh5 start'));
      console.log('');
    }
  });
}