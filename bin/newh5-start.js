#!/usr/bin/env node --harmony

const spawn = require('cross-spawn')
const program = require('commander')

program.parse(process.argv)

const result = spawn.sync(
  'babel-node', [require.resolve('../src/start')].concat(program.args), {
    stdio: 'inherit'
  }
)
process.exit(result.status)
