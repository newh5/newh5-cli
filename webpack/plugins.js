const allConfig = require('../config/index.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Visualizer = require('webpack-visualizer-plugin')
const webpack = require('webpack')
const zeptoPath = require.resolve('zepto/dist/zepto.min.js')
const _ = require('lodash')
const HeadJavascriptInjectPlugin = require('./HeadJavascriptInjectPlugin')

const addOneOrMorePlugins = _.curry(function (pluginClass, plugins, options) {
  if (_.isArray(options)) {
    Array.prototype.push.apply(plugins, options.map(function (c) {
      return new pluginClass(c)
    }))
  } else if (options) {
    plugins.push(new pluginClass(options))
  }
  return plugins
})

const addHtmlWebpackPlugins = addOneOrMorePlugins(HtmlWebpackPlugin)

const getPlugins = function (config) {
  var plugins = [].concat(config.plugins)

  addHtmlWebpackPlugins(plugins, config.htmlWebpackPluginOptions)

  plugins.push(new webpack.DefinePlugin(_.extend({
    NEWH5_ENV: JSON.stringify(config.NEWH5_ENV)
  }, config.definePluginOptions)))

  plugins.push(new HeadJavascriptInjectPlugin())

  plugins.push(new webpack.ProvidePlugin({
    $: zeptoPath,
    Zepto: zeptoPath,
    'window.Zepto': zeptoPath
  }))

  config.enableWebpackVisualizer && plugins.push(new Visualizer({
    filename: './webpack-stats.html'
  }))

  return plugins
}

exports.HeadJavascriptInjectPlugin = HeadJavascriptInjectPlugin
exports.getPlugins = getPlugins
