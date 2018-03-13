'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 *
 * 
 */

var copy = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dist) {
        var ncp;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        dist = dist || 'build';
                        ncp = _bluebird2.default.promisify(require('ncp'));
                        _context.prev = 2;
                        _context.next = 5;
                        return _bluebird2.default.all([ncp('dist/', dist + '/')]);

                    case 5:
                        _context.next = 10;
                        break;

                    case 7:
                        _context.prev = 7;
                        _context.t0 = _context['catch'](2);

                        console.log(_context.t0);

                    case 10:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[2, 7]]);
    }));

    return function copy(_x) {
        return _ref.apply(this, arguments);
    };
}();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = copy;