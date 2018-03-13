'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spawnPromise = exports.execPromise = exports.goBranch = exports.createEmptyBranch = exports.getBranchName = exports.getRemoteURL = undefined;

var _gitRepo = require('./git-repo');

var _cp = require('./cp');

var getRemoteURL = exports.getRemoteURL = _gitRepo.getCurrentRemoteURL;
var getBranchName = exports.getBranchName = _gitRepo.getCurrentBranchName;
var createEmptyBranch = exports.createEmptyBranch = _gitRepo.createEmptyBranch;
var goBranch = exports.goBranch = _gitRepo.gotoBranch;

var execPromise = exports.execPromise = _cp.exec;
var spawnPromise = exports.spawnPromise = _cp.spawn;