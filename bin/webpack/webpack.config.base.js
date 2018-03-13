'use strict';

var path = require('path');
var webpack = require("webpack");
var _ = require('lodash');

var _require = require('./resolve.js'),
    resolveApp = _require.resolveApp,
    resolveOwn = _require.resolveOwn;

var _require2 = require('./plugins.js'),
    getPlugins = _require2.getPlugins;

var allConfig = require('../config/index.js');

var NODE_ENV = process.env.NODE_ENV || '';
var config = _.merge({}, allConfig, allConfig[NODE_ENV.toUpperCase()]);

var zeptoPath = require.resolve('zepto/dist/zepto.min.js');

var baseConfig = {
    mode: config.NEWH5_ENV, //"development" | "production" | "none"
    entry: { index: 'src/js/main.js' },
    module: {
        rules: [{
            test: zeptoPath,
            use: [{
                loader: 'exports-loader',
                options: 'window.$'
            }, 'script-loader']
        }, {
            test: /\.(aac|mp3|mp4|webm|mov|ogg|ogv)(\?\S*)?$/,
            use: [{
                loader: 'file-loader',
                options: config.audioLoaderQuery
            }]
        }, {
            test: /\.html$/,
            use: [{
                loader: 'html-loader',
                options: {
                    minimize: config.enableHTMLCompress
                }
            }]
        }].concat(config.rules)
    },
    plugins: getPlugins(config),
    optimization: {
        splitChunks: {
            chunks: "initial", // 必须三选一： "initial" | "all"(默认就是all) | "async"
            minSize: 0, // 最小尺寸，默认0
            minChunks: 1, // 最小 chunk ，默认1
            maxAsyncRequests: 1, // 最大异步请求数， 默认1
            maxInitialRequests: 1, // 最大初始化请求书，默认1
            name: function name() {}, // 名称，此选项课接收 function
            cacheGroups: { // 这里开始设置缓存的 chunks
                priority: "0", // 缓存组优先级 false | object |
                vendor: { // key 为entry中定义的 入口名称
                    chunks: "initial", // 必须三选一： "initial" | "all" | "async"(默认就是异步)
                    test: /react|lodash/, // 正则规则验证，如果符合就提取 chunk
                    name: "vendor", // 要缓存的 分隔出来的 chunk 名称
                    minSize: 0,
                    minChunks: 1,
                    enforce: true,
                    maxAsyncRequests: 1, // 最大异步请求数， 默认1
                    maxInitialRequests: 1, // 最大初始化请求书，默认1
                    reuseExistingChunk: true // 可设置是否重用该chunk（查看源码没有发现默认值）
                }
            }
        }
    },
    // output: {
    //     path: path.join(__dirname, "dist"),
    //     // filename: "[name].js",
    //     // chunkFilename: "[name].chunk.js"
    // },
    output: _.merge({}, config.output, {
        path: resolveApp(config.output.path)
    }),
    resolve: {
        extensions: ['.js', '.css', '.scss', '.less', '.styl'],
        alias: {
            src: resolveApp('src')
        }
    },
    resolveLoader: {
        // moduleExtensions: ['-loader'],
        modules: [resolveApp('node_modules'), resolveOwn('node_modules')]
    },
    externals: config.externals || {}
};

module.exports = baseConfig;