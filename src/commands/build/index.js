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
            let configs = {
                archive: commander.archive,
                debug: commander.debug
            }
            await runBuild(configs)
        })
}

/**
 * 
 * @param {*} opts { archive, debug }
 */
async function runBuild(opts) {

    if (opts.archive && typeof opts.archive === 'string') {
        let archiveType = path.extname(opts.archive).slice(1)
        if (!~ARCHIVE_TYPE.indexOf(archiveType)) {
            console.log('')
            console.log(chalk.red('  archive filename suffix only support: ') + chalk.bgRed(ARCHIVE_TYPE))
            console.log('')
            process.exit(1)
        }
    }

    let buildCommand = new BuildCommand()
    await buildCommand.execute({
        projectname: process.env.Newh5_ProjectName,
        debug: opts.debug ? opts.debug : '',
        archive: opts.archive ? opts.archive : ''
    })

    // const result = spawn.sync(
    //     'node', [
    //         require.resolve('./build'),
    //         opts.debug ? opts.debug : '',
    //         opts.archive ? opts.archive : '',
    //     ].concat(opts.args), {
    //         stdio: 'inherit'
    //     }
    // )
    process.exit(result.status)
}
