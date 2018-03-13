'use strict';

var fs = require('fs');
var path = require('path');

// https://github.com/facebookincubator/create-react-app/issues/637
var appDirectory = fs.realpathSync(process.cwd());

exports.resolveApp = function resolveApp(relativePath) {
    return path.resolve(appDirectory, relativePath);
};

exports.resolveOwn = function resolveOwn(relativePath) {
    return path.resolve(__dirname, '..', relativePath);
};