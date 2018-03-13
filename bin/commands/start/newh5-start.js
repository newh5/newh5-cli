#!/usr/bin/env node --harmony
'use strict';

var spawn = require('cross-spawn');
var program = require('commander');

program.parse(process.argv);

var result = spawn.sync('babel-node', [require.resolve('../src/start')].concat(program.args), {
  stdio: 'inherit'
});
process.exit(result.status);