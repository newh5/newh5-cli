#!/usr/bin/env node --harmony
'use strict';

// require("babel-register")
require("babel-polyfill");

var commander = require('commander');
var version = require('../package.json').version;
var listCommands = require('./commands/list/').default;
var initCommands = require('./commands/init/').default;
var startCommands = require('./commands/start').default;
var buildCommands = require('./commands/build').default;
var deployCommands = require('./commands/deploy').default;

'use strict';

commander.version(version);
listCommands(commander);
initCommands(commander);
startCommands(commander);
buildCommands(commander);
deployCommands(commander);

commander.on('--help', function () {
    console.log('');
    console.log('  Examples:');
    console.log('');
    console.log('    # Init project');
    console.log('    $ newh5 init');
    console.log('');
    console.log('    # Base on template init project');
    console.log('    $ newh5 init -t panorama');
    console.log('');
    console.log('    # See all templates');
    console.log('    $ newh5 list');
    console.log('');
    console.log('    # See specific subcommand help');
    console.log('    $ newh5 help init');
    console.log('');
    console.log('');
});

commander.parse(process.argv);

if (commander.args.length < 1) {
    console.log('Welcome!');
    console.log(commander.helpInformation());
}

if (!commander.runningCommand) {
    console.log('');
    console.log('  Unknow command: ' + commander.args.join(' '));
    console.log('');
    console.log('  See help `newh5 help`');
    console.log('');
    // commander.help()
}