#!/usr/bin/env node --harmony
const chalk = require('chalk')
const spawn = require('cross-spawn')

/**
 * luanch
 */
function luanch() {

  console.log(chalk.cyan('  Starting the development server...'))

  const result = spawn.sync(
    'node', [require.resolve('./start.js')].concat(process.argv), {
      stdio: 'inherit'
    }
  )
  process.exit(result.status)
}


/**
* @exports
* @param {Commander} commander 定义命令的基本类库实例
*/
export default commander => {
  commander
    .command('start')
    .description('run projects')
    .action(() => {
      luanch()
    })
};