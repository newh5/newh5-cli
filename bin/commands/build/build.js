'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.NODE_ENV = 'production';

var fs = require('fs-extra');
var path = require('path');
var util = require('util');
var chalk = require('chalk');
var _ = require('lodash');
var webpack = require('webpack');
var clearConsole = require('react-dev-utils/clearConsole');
var webpackConfig = require('../../webpack/webpack.config.build.js');
var archiver = require('archiver');

/**
 * 
 */

var BuildComd = function () {
  function BuildComd() {
    (0, _classCallCheck3.default)(this, BuildComd);
  }

  (0, _createClass3.default)(BuildComd, [{
    key: 'execute',


    /**
     * init 
     */
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(config) {
        var buildPath, debug, value;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                buildPath = webpackConfig.output.path;
                debug = config.debug; //process.argv[2]

                this.archiveName = config.archiveName; //process.argv[3]

                // clearConsole()

                if (debug) {
                  value = '';

                  if (debug === '.') {
                    value = webpackConfig;
                  } else {
                    value = _.get(webpackConfig, debug);
                  }

                  console.log('');
                  console.log(chalk.yellow('[DEBUG] ') + 'webpack config   KEY: ' + chalk.yellow(debug));
                  console.log(chalk.yellow('[DEBUG] ') + 'webpack config VALUE: ' + chalk.yellow(util.inspect(value, {
                    depth: null
                  })));
                  console.log();
                }
                console.log('');
                console.log(chalk.cyan('  Prepare build ...'));
                console.log('');
                console.log(chalk.cyan('  Empty directory: ') + chalk.cyan.inverse(buildPath));
                fs.emptyDirSync(buildPath);

                _context.next = 11;
                return this.build();

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function execute(_x) {
        return _ref.apply(this, arguments);
      }

      return execute;
    }()

    /**
     * build
     */

  }, {
    key: 'build',
    value: function build() {

      console.log('');
      console.log(chalk.cyan('  Build begin ...'));
      console.log('');

      var archiveName = this.archiveName;

      return new _promise2.default(function (resolve, reject) {

        webpack(webpackConfig, function (err, stats) {

          if (err) {
            console.log(chalk.red(err));
            reject();
            throw err;
          }

          process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
          }) + '\n');

          console.log('');
          console.log(chalk.green('  Build finished.'));
          console.log('');

          if (archiveName) {
            console.log(chalk.yellow('  Archive begin ...'));
            console.log('');
            var archivePath = webpackConfig.output.path;
            var outputPath = path.dirname(archivePath);
            var archiveType = 'zip';
            if (archiveName === 'true') {
              outputPath = path.join(outputPath, path.basename(archivePath) + '.' + archiveType);
            } else {
              outputPath = path.join(outputPath, archiveName);
              archiveType = path.extname(archiveName).slice(1);
            }

            var archive = archiver(archiveType);
            var output = fs.createWriteStream(outputPath);
            output.on('close', function () {
              console.log(chalk.yellow('  Archive finished, output: ') + chalk.bgYellow(outputPath) + ' ' + chalk.bgYellow(archive.pointer() + ' bytes'));
              console.log('');
            });
            archive.on('warning', function (err) {
              if (err.code === 'ENOENT') {
                console.log(chalk.red('  Archive warn: ' + err));
              } else {
                console.log(chalk.red('  Archive error: ' + err));
              }
            });
            archive.on('error', function (err) {
              console.log(chalk.red('  Archive error: ' + err));
            });
            archive.pipe(output);
            archive.directory(archivePath, false);
            archive.finalize();
          }

          resolve();
        });
      });
    }
  }]);
  return BuildComd;
}();

exports.default = BuildComd;