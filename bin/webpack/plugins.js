'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var allConfig = require('../config/index.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Visualizer = require('webpack-visualizer-plugin');
var webpack = require('webpack');
var zeptoPath = require.resolve('zepto/dist/zepto.min.js');
var _ = require('lodash');
var HeadJavascriptInjectPlugin = require('./HeadJavascriptInjectPlugin');

var addOneOrMorePlugins = _.curry(function (pluginClass, plugins, options) {
  if (_.isArray(options)) {
    Array.prototype.push.apply(plugins, options.map(function (c) {
      return new pluginClass(c);
    }));
  } else if (options) {
    plugins.push(new pluginClass(options));
  }
  return plugins;
});

var addHtmlWebpackPlugins = addOneOrMorePlugins(HtmlWebpackPlugin);

var getPlugins = function getPlugins(config) {
  var plugins = [].concat(config.plugins);

  addHtmlWebpackPlugins(plugins, config.htmlWebpackPluginOptions);

  plugins.push(new webpack.DefinePlugin(_.extend({
    NEWH5_ENV: (0, _stringify2.default)(config.NEWH5_ENV)
  }, config.definePluginOptions)));

  plugins.push(new HeadJavascriptInjectPlugin());

  plugins.push(new webpack.ProvidePlugin({
    $: zeptoPath,
    Zepto: zeptoPath,
    'window.Zepto': zeptoPath
  }));

  config.enableWebpackVisualizer && plugins.push(new Visualizer({
    filename: './webpack-stats.html'
  }));

  return plugins;
};

exports.HeadJavascriptInjectPlugin = HeadJavascriptInjectPlugin;
exports.getPlugins = getPlugins;