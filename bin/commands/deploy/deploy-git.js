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

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _gitRepository = require('git-repository');

var _gitRepository2 = _interopRequireDefault(_gitRepository);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _build = require('../build/build.js');

var _build2 = _interopRequireDefault(_build);

var _tools = require('../../tools');

var _copy = require('../../tools/copy');

var _copy2 = _interopRequireDefault(_copy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 发布xadmin项目
 */
'use strict';

var repoPath = _path2.default.join(process.cwd(), 'build');
var deployBranchName = 'deploy';
var remoteName = 'origin';

// async function isCDN() {
//   return new Promise(resolve => {
//     inquirer.prompt(
//       [{
//         type: 'list',
//         name: 'isCDN',
//         message: 'Will you upload static files to CDN? [CTRL-C to Exit]',
//         choices: ['no', 'yes']
//       }]
//     ).then(function (answer) {
//       resolve(answer)
//     })
//   })
// }

var DeployGit = function () {
  function DeployGit() {
    (0, _classCallCheck3.default)(this, DeployGit);
  }

  (0, _createClass3.default)(DeployGit, [{
    key: 'execute',

    /**
     * 
     * @param {Object} config
     */
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(config) {
        var currentPath, remoteURL, branchName, git, buildCommand;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:

                // let result = await isCDN()
                // console.log(result)
                console.log(_chalk2.default.yellow('准备将编译结果推送至远端...'));

                currentPath = process.cwd();
                _context.next = 4;
                return (0, _tools.getRemoteURL)(currentPath);

              case 4:
                remoteURL = _context.sent;
                _context.next = 7;
                return (0, _tools.getBranchName)(currentPath);

              case 7:
                branchName = _context.sent;


                console.log("repoPath, deployBranchName, remoteName=", _chalk2.default.red(repoPath, deployBranchName, remoteName));
                console.log("currentPath, remoteURL, branchName=", _chalk2.default.red(currentPath, remoteURL, branchName));

                // 检测build文件夹是否存在, 因为老项目肯定是没有的, 没有就取创建一个
                _context.next = 12;
                return this.checkRepoPath();

              case 12:
                console.log('current git remote url is ' + remoteURL);

                if (remoteURL) {
                  _context.next = 16;
                  break;
                }

                console.error(_chalk2.default.red('本地没有找到可用的git'));
                return _context.abrupt('return');

              case 16:

                // 初始化build目录的git环境
                console.log(_chalk2.default.red('初始化build目录的git环境'));

                _context.next = 19;
                return _gitRepository2.default.open(repoPath, { init: true });

              case 19:
                git = _context.sent;
                _context.next = 22;
                return git.setRemote(remoteName, remoteURL);

              case 22:
                _context.next = 24;
                return git.hasRef(remoteURL, deployBranchName);

              case 24:
                if (!_context.sent) {
                  _context.next = 35;
                  break;
                }

                _context.next = 27;
                return git.fetch(remoteName);

              case 27:
                _context.next = 29;
                return (0, _tools.goBranch)(deployBranchName, repoPath);

              case 29:
                _context.next = 31;
                return git.reset(remoteURL + '/' + deployBranchName, { hard: true });

              case 31:
                _context.next = 33;
                return git.clean({ force: true });

              case 33:
                _context.next = 36;
                break;

              case 35:
                (0, _tools.createEmptyBranch)(deployBranchName, repoPath);

              case 36:

                console.log(_chalk2.default.red('开始 编译.....'));

                // 自动编译
                buildCommand = new _build2.default();
                _context.next = 40;
                return buildCommand.execute({
                  debug: '',
                  archive: ''
                });

              case 40:
                _context.next = 42;
                return (0, _copy2.default)(repoPath);

              case 42:
                _context.prev = 42;
                _context.next = 45;
                return git.add('--all .');

              case 45:
                _context.next = 47;
                return git.commit(config.commitInfo || config.name + ' deploy');

              case 47:
                _context.next = 49;
                return git.push(remoteName, deployBranchName);

              case 49:

                console.log(_chalk2.default.green('deploy completed v(^O^)v'));

                _context.next = 56;
                break;

              case 52:
                _context.prev = 52;
                _context.t0 = _context['catch'](42);

                console.error('push to remote branch error');
                console.error(_context.t0);

              case 56:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[42, 52]]);
      }));

      function execute(_x) {
        return _ref.apply(this, arguments);
      }

      return execute;
    }()
    /**
     * 针对老项目的文件夹创建
     * 
     * @returns Promise
     */

  }, {
    key: 'checkRepoPath',
    value: function checkRepoPath() {
      var _this = this;

      console.log(_chalk2.default.yellow('\u5F00\u59CB\u68C0\u67E5\u53D1\u5E03\u76EE\u5F55, \u68C0\u67E5\u7684\u8DEF\u5F84\u662F' + repoPath));
      return new _promise2.default(function (resolve, reject) {
        _fs2.default.stat(repoPath, function (err, stat) {
          if (err) {
            _this.checkRepoPathErrorHandler(err, resolve, reject);
          } else {
            _this.checkRepoPathSuccessHandler(stat, resolve);
          }
        });
      });
    }
    /**
     * fs.stat时获取的err结果
     * @param {Object} err
     * @param {Function} resolve Promise.resolve
     * @param {Function} reject Promise.reject
     */

  }, {
    key: 'checkRepoPathErrorHandler',
    value: function checkRepoPathErrorHandler(err, resolve, reject) {
      if (err.code == 'ENOENT') {
        console.error('未找到目录');
        this.createDir();
        resolve();
        return;
      }
      reject();
    }
    /**
     * @param {Object} stat fs.stat 获取的参数
     * @param {Function} resolve Promise.resolve
     */

  }, {
    key: 'checkRepoPathSuccessHandler',
    value: function checkRepoPathSuccessHandler(stat, resolve) {
      if (!stat.isDirectory()) {
        this.createDir();
      }
      resolve();
    }
    /**
     * 创建build目录
     */

  }, {
    key: 'createDir',
    value: function createDir() {
      console.log(_chalk2.default.yellow('开始创建目录'));
      _fs2.default.mkdirSync(repoPath);
    }
  }]);
  return DeployGit;
}();

exports.default = DeployGit;