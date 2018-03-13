'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spawn = exports.exec = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var exec = function exec(command, args, options) {
  return new _promise2.default(function (resolve, reject) {
    var out = '';
    var err = '';
    var p = _child_process2.default.spawn(command, args, options);
    p.stdout.on('data', function (data) {
      return out += data;
    });
    p.stderr.on('data', function (data) {
      return err += data;
    });
    p.on('error', reject);
    p.on('close', function (code) {
      out = out.trim();
      err = err.trim();
      resolve({ code: code, out: out, err: err });
    });
  });
}; /**
    * 执行命令
    */


var spawn = function spawn(command, args, options) {
  return new _promise2.default(function (resolve, reject) {
    _child_process2.default.spawn(command, args, options).on('error', reject).on('close', resolve);
  });
};

exports.exec = exec;
exports.spawn = spawn;