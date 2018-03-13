'use strict';

var path = require('path');
var _ = require('lodash');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var merge = require('webpack-merge');

var allConfig = require('../config/index.js');
var baseWebpackConfig = require('./webpack.config.base.js');
var postcssPlugins = require('./postcss.config.js');

var config = _.merge({}, allConfig, allConfig.PRODUCTION);

var imageLoaders = [{
    loader: 'url-loader',
    options: config.imgLoaderQuery
}];
var imageToBase64Loaders = [{
    loader: 'url-loader',
    options: {
        limit: '10000000'
    }
}];
var imageWebpackLoader = {
    loader: 'image-webpack-loader',
    options: config.imageWebpackLoader
};
config.enableImageMin && imageLoaders.push(imageWebpackLoader);
config.enableImageMin && imageToBase64Loaders.push(imageWebpackLoader);

var cssLoader = [{
    loader: 'css-loader',
    options: _.merge({}, config.cssLoaderOptions, {
        minimize: config.enableCSSCompress
    })
}, {
    loader: 'postcss-loader',
    options: {
        plugins: postcssPlugins
    }
}];

var publicPath = config.outputCssPublicPath || config.output.publicPath;

var plugins = [new ExtractTextPlugin({
    filename: config.outputCss,
    allChunks: true
})];

var optimizationOpts = _.extend({}, allConfig.PRODUCTION.optimizationOptions, {
    minimize: config.enableJSCompress
});

module.exports = merge(baseWebpackConfig, {
    // entry: config.entry,
    module: {
        rules: [{
            test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|jpg|gif)(\?\S*)?$/,
            exclude: [/node_modules/].concat(config.imgToBase64Dir),
            use: imageLoaders
        }, {
            test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|jpg|gif)(\?\S*)?$/,
            exclude: /node_modules/,
            include: config.imgToBase64Dir,
            use: imageToBase64Loaders
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: cssLoader,
                publicPath: publicPath
            })
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: cssLoader.concat('sass-loader'),
                publicPath: publicPath
            })
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: cssLoader.concat('less-loader'),
                publicPath: publicPath
            })
        }, {
            test: /\.styl$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: cssLoader.concat('stylus-loader'),
                publicPath: publicPath
            })
        }]
    },
    plugins: plugins,
    optimization: optimizationOpts
});