'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gotoBranch = exports.createEmptyBranch = exports.getCurrentRemoteURL = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getCurrentRemoteURL = exports.getCurrentRemoteURL = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(cwd) {
    var result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _cp.exec)('git', ['config', '--get', 'remote.origin.url'], { cwd: cwd, encoding: 'utf8' });

          case 2:
            result = _context.sent;
            return _context.abrupt('return', result.out);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getCurrentRemoteURL(_x) {
    return _ref.apply(this, arguments);
  };
}();

var createEmptyBranch = exports.createEmptyBranch = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(branchName, cwd) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _cp.exec)('git', ['checkout', '--orphan', branchName], { cwd: cwd, encoding: 'utf8' });

          case 2:
            _context2.next = 4;
            return (0, _cp.exec)('git', ['rm', '--catch', '-r'], { cwd: cwd, encoding: 'utf8' });

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function createEmptyBranch(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var gotoBranch = exports.gotoBranch = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(branchName, cwd) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _cp.exec)('git', ['checkout', branchName], { cwd: cwd, encoding: 'utf8' });

          case 2:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function gotoBranch(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getCurrentBranchName = getCurrentBranchName;
exports.crateAndGoBranch = crateAndGoBranch;

var _child_process = require('child_process');

var _cp = require('./cp');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

function getCurrentBranchName(cwd) {
  return (0, _child_process.spawnSync)('git', ['rev-parse', '--abbrev-ref', 'HEAD'], { cwd: cwd, encoding: 'utf8' }).stdout.toString().trim();
};

;
/**
 * 
 * @export
 * @param {String} branchName
 * @param {String} cwd
 */
function crateAndGoBranch(branchName, cwd) {
  (0, _child_process.spawnSync)('git', ['checkout', '-b', branchName], { cwd: cwd });
};