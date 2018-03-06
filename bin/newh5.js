#!/usr/bin/env node

const program = require('commander')
const pkg = require('../package.json')

program
  .version(pkg.version)
  .command('init', 'init project')
  .command('list', 'list all templates')
  .command('start', 'run on develpoment mode')
  .command('build', 'build for production')
  .command('deploy', 'deploy for production')

program.on('--help', function(){
  console.log('')
  console.log('  Examples:')
  console.log('')
  console.log('    # Init project')
  console.log('    $ newh5 init')
  console.log('')
  console.log('    # Base on template init project')
  console.log('    $ newh5 init -t panorama')
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

// console.log('! program:', program)
// console.log('!================')

// if (!process.argv.slice(2).length) {
//   program.outputHelp()
// }
if (!program.runningCommand) {
  console.log('')
  console.log('  Unknow command: ' + program.args.join(' '))
  console.log('')
  console.log('  See help `newh5 help`')
  console.log('')
  // program.help()
}