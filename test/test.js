#!/usr/bin/env node

/**
 * Test case: cross-spawn
 */
const spawn = require('cross-spawn')
// Spawn NPM asynchronously
const child = spawn('npm', ['list', '-g', '-depth', '0'], { stdio: 'inherit' });
// Spawn NPM synchronously
// const result = spawn.sync('npm', ['list', '-g', '-depth', '0'], { stdio: 'inherit' });



/**
 * Test case: commander
 * 
const program = require('commander')
program
    .version('0.1.0')
    .option('-p, --peppers', 'Add peppers')
    .option('-P, --pineapple', 'Add pineapple')
    .option('-b, --bbq-sauce', 'Add bbq sauce')
    .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
//  .parse(process.argv);

program
    .command('deploy ')
    .description('部署一个服务节点')
    .action(function (name) {
        console.log('Deploying "%s"', name);
    });

program
    .command('exec <cmd>')
    .alias('ex')
    .description('execute the given remote cmd')
    .option("-e, --exec_mode <mode>", "Which exec mode to use")
    .action(function (cmd, options) {
        console.log('exec "%s" using %s mode', cmd, options.exec_mode);
    }).on('--help', function () {
        console.log();
        console.log('  Examples:');
        console.log();
        console.log('    $ deploy exec sequential');
        console.log('    $ deploy exec async');
        console.log();
    });


program.parse(process.argv);

console.log('you ordered a pizza with:');
if (program.peppers) console.log('  - peppers');
if (program.pineapple) console.log('  - pineapple');
if (program.bbqSauce) console.log('  - bbq');
console.log('  - %s cheese', program.cheese);
 */