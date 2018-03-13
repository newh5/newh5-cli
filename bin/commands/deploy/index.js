#!/usr/bin/env node --harmony
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deployGit = require('./deploy-git');

var _deployGit2 = _interopRequireDefault(_deployGit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var spawn = require('cross-spawn');

/**
* @exports
* @param {Commander} commander 定义命令的基本类库实例
*/
exports.default = function (commander) {
  commander.command('deploy').option('-m, --commitInfo <commitInfo>', 'set commit message when deploy').description('deploy projects').action(function () {
    run({
      name: 'NewPorject',
      commitInfo: commander.commitInfo ? commander.commitInfo : ''
    });
  });
};

function run(config) {

  var deployCommand = new _deployGit2.default();
  deployCommand.execute(config);

  // const result = spawn.sync(
  //   'node', [require.resolve('./deploy')].concat(process.argv), {
  //     stdio: 'inherit'
  //   }
  // )
  // process.exit(result.status)
}