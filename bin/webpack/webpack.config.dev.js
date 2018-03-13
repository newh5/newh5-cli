'use strict';

var path = require('path');
var _ = require('lodash');
var merge = require('webpack-merge');
var webpack = require('webpack');
var NpmInstallPlugin = require('npm-install-webpack-plugin');

var allConfig = require('../config/index.js');
var baseWebpackConfig = require('./webpack.config.base.js');
var postcssPlugins = require('./postcss.config.js');

var config = _.merge({}, allConfig, allConfig.DEVELOPMENT);

var cssLoader = [{
    loader: 'css-loader',
    options: config.cssLoaderOptions
}, {
    loader: 'postcss-loader',
    options: {
        plugins: postcssPlugins
    }
}];

module.exports = merge(baseWebpackConfig, {
    module: {
        rules: [{
            test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|jpg|gif)(\?\S*)?$/,
            exclude: [/node_modules/].concat(config.imgToBase64Dir),
            use: [{
                loader: 'url-loader',
                options: config.imgLoaderQuery
            }]
        }, {
            test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|jpg|gif)(\?\S*)?$/,
            exclude: /node_modules/,
            include: config.imgToBase64Dir,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: '10000000'
                }
            }]
        }, {
            test: /\.css$/,
            use: ['style-loader'].concat(cssLoader)
        }, {
            test: /\.scss$/,
            use: ['style-loader'].concat(cssLoader, 'sass-loader')
        }, {
            test: /\.less$/,
            use: ['style-loader'].concat(cssLoader, 'less-loader')
        }, {
            test: /\.styl$/,
            use: ['style-loader'].concat(cssLoader, 'stylus-loader')
        }]
    },
    devServer: {
        disableHostCheck: true,
        port: config.devPort,
        // host: '0.0.0.0',
        // contentBase: '',
        // publicPath: config.output.publicPath,
        publicPath: '/', // 开发模式固定用 /
        hot: true,
        inline: true,
        quiet: true,
        // compress: true,
        // clientLogLevel: 'none',
        historyApiFallback: true,
        watchOptions: {
            ignored: /node_modules/,
            aggregateTimeout: 300,
            poll: 1000
        }
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
});