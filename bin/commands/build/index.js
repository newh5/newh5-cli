#!/usr/bin/env node --harmony
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var runBuild = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var archiveType, buildCommand;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:

                        if (commander.archive && typeof commander.archive === 'string') {
                            archiveType = path.extname(commander.archive).slice(1);

                            if (!~ARCHIVE_TYPE.indexOf(archiveType)) {
                                console.log('');
                                console.log(chalk.red('  archive filename suffix only support: ') + chalk.bgRed(ARCHIVE_TYPE));
                                console.log('');
                                process.exit(1);
                            }
                        }

                        buildCommand = new _build2.default();
                        _context2.next = 4;
                        return buildCommand.execute({
                            debug: commander.debug ? commander.debug : '',
                            archive: commander.archive ? commander.archive : ''
                        });

                    case 4:

                        // const result = spawn.sync(
                        //     'node', [
                        //         require.resolve('./build'),
                        //         commander.debug ? commander.debug : '',
                        //         commander.archive ? commander.archive : '',
                        //     ].concat(commander.args), {
                        //         stdio: 'inherit'
                        //     }
                        // )
                        process.exit(result.status);

                    case 5:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function runBuild() {
        return _ref2.apply(this, arguments);
    };
}();

var _build = require('./build');

var _build2 = _interopRequireDefault(_build);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var spawn = require('cross-spawn');
var path = require('path');
var commander = require('commander');
var chalk = require('chalk');


var ARCHIVE_TYPE = ['zip', 'tar'];

/**
* @exports
* @param {Commander} commander 定义命令的基本类库实例
*/

exports.default = function (commander) {
    commander.command('build').description('build projects').option('-d, --debug <key>', 'print `key` corresponding configuration').option('-a, --archive [name]', 'archive output directory, support: ' + ARCHIVE_TYPE).action((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return runBuild(commander);

                    case 2:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    })));
};