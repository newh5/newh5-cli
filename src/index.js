#!/usr/bin/env node --harmony
const debug = require('debug')('newh5-cli:MainIndex')
process.env._.indexOf('babel-node') < 0 && require("babel-polyfill");

import path from 'path'
import program from 'commander'
import listCommands from './commands/list/'
import initCommands from './commands/init/'
import startCommands from './commands/start/'
import buildCommands from './commands/build/'
import deployCommands from './commands/deploy/'
const version = require('../package.json').version

'use strict';

debug('process.cwd: %s', process.cwd())
debug('__dirname: %s', __dirname)

process.env.Newh5_BuildPath = path.resolve(__dirname, "../_build")

program.version(version)
listCommands(program)
initCommands(program)
startCommands(program)
buildCommands(program)
deployCommands(program)

program.command('help')
    .description('newh5 help')
    .action(() => {
        program.help()
    })

program.on('--help', function () {
    console.log('')
    console.log('  Examples:')
    console.log('')
    console.log('    # Init project')
    console.log('    $ newh5 init')
    console.log('')
    console.log('    # Base on template init project')
    console.log('    $ newh5 init -t base')
    console.log('')
    console.log('    # See all templates')
    console.log('    $ newh5 list')
    console.log('')
    console.log('    # See specific subcommand help')
    console.log('    $ newh5 help init')
    console.log('')
    console.log('')
})

program.parse(process.argv)

if (program.args.length < 1) {
    console.log('Welcome!')
    console.log(program.helpInformation())
} else {
    console.log('')
    program.args.forEach(o => {
        debug(`name=${o._name}, description= ${o._description}`)
    })
}

if (!program.runningCommand) {
    console.log('')
    console.log('  Unknow command: ' + process.argv.join(' '))
    console.log('')
    console.log('  See help `newh5 help`')
    console.log('')
    // program.help()
}