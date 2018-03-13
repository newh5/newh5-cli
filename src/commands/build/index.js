#!/usr/bin/env node --harmony

const spawn = require('cross-spawn')
const path = require('path')
const commander = require('commander')
const chalk = require('chalk')
import BuildCommand from './build';

const ARCHIVE_TYPE = ['zip', 'tar']

/**
* @exports
* @param {Commander} commander 定义命令的基本类库实例
*/
export default commander => {
    commander
        .command('build')
        .description('build projects')
        .option('-d, --debug <key>', 'print `key` corresponding configuration')
        .option('-a, --archive [name]', 'archive output directory, support: ' + ARCHIVE_TYPE)
        .action(async () => {
            await runBuild(commander)
        })
}

async function runBuild() {

    if (commander.archive && typeof commander.archive === 'string') {
        let archiveType = path.extname(commander.archive).slice(1)
        if (!~ARCHIVE_TYPE.indexOf(archiveType)) {
            console.log('')
            console.log(chalk.red('  archive filename suffix only support: ') + chalk.bgRed(ARCHIVE_TYPE))
            console.log('')
            process.exit(1)
        }
    }

    let buildCommand = new BuildCommand()
    await buildCommand.execute({
        debug: commander.debug ? commander.debug : '',
        archive: commander.archive ? commander.archive : ''
    })

    // const result = spawn.sync(
    //     'node', [
    //         require.resolve('./build'),
    //         commander.debug ? commander.debug : '',
    //         commander.archive ? commander.archive : '',
    //     ].concat(commander.args), {
    //         stdio: 'inherit'
    //     }
    // )
    process.exit(result.status)
}
