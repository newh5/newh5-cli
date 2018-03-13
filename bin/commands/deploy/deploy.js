'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var run = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var deployCommand;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        deployCommand = new _deployGit2.default();
                        _context.next = 3;
                        return deployCommand.execute({
                            name: 'new project',
                            commitInfo: 'commit message'
                        });

                    case 3:
                        console.log('done');

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function run() {
        return _ref.apply(this, arguments);
    };
}();

var _deployGit = require('./deploy-git');

var _deployGit2 = _interopRequireDefault(_deployGit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 因为使用了babel-cli,可以在node中使用es6; 具体用法 http://babeljs.io/docs/usage/cli/

var inquirer = require('inquirer');


run();