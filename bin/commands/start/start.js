'use strict';

process.env.NODE_ENV = 'development';
process.traceDeprecation = true;

var chalk = require('chalk');
var ip = require('ip');
var qrcode = require('qrcode-terminal');

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var clearConsole = require('react-dev-utils/clearConsole');
var formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
var openBrowser = require('react-dev-utils/openBrowser');

var allConfig = require('../../config/index.js');
var webpackConfig = require('../../webpack/webpack.config.dev.js');
var isInteractive = process.stdout.isTTY;

var isFirstRun = true;
var compiler = void 0;

function setupCompiler(host, port) {
  compiler = webpack(webpackConfig);

  compiler.plugin('invalid', function () {
    console.log('');
    console.log(chalk.cyan('  Compiling...'));
    console.log('');
  });

  compiler.plugin('done', function (stats) {
    process.stdout.write(stats.toString({
      colors: true,
      reasons: true,
      errorDetails: true,

      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n');

    if (stats.hasErrors()) {
      console.log('');
      console.log(chalk.cyan('  Compiling fail!'));
      console.log('');
      return;
    }

    if (isFirstRun) {
      console.log('');
      console.log(chalk.cyan('  Compile finished'));
      console.log('');
      console.log(chalk.cyan('  Webpack dev server running at: '));
      console.log('');
      console.log(chalk.cyan('  http://' + host + ':' + port + '/'));
      console.log('');
      if (allConfig.DEVELOPMENT.enableDisplayQR) {
        qrcode.generate('http://' + host + ':' + port + '/', {
          small: true
        }, function (qrcode) {
          console.log(qrcode);
        });
      }
    }

    isFirstRun = false;
  });
}

function runDevServer(host, port) {
  var devServer = new WebpackDevServer(compiler, webpackConfig.devServer);

  devServer.listen(port, function (err, result) {
    if (err) {
      return console.log(err);
    }

    console.log(chalk.cyan('  Starting the development server...'));
    console.log();

    if (isInteractive) {
      openBrowser('http://' + host + ':' + port + '/');
    }
  });
}

function run(port) {
  var host = ip.address();
  setupCompiler(host, port);
  runDevServer(host, port);
}

clearConsole();
run(webpackConfig.devServer.port);