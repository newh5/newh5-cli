#!/usr/bin/env node --harmony

const spawn = require('cross-spawn')
import DeployGit from './deploy-git'

/**
* @exports
* @param {Commander} commander 定义命令的基本类库实例
*/
export default commander => {
  commander
    .command('deploy')
    .option('-m, --commitInfo <commitInfo>', 'set commit message when deploy')
    .description('deploy projects')
    .action(() => {
      run({
        name: 'NewPorject',
        commitInfo: commander.commitInfo ? commander.commitInfo : ''
      })
    })
}


function run(config) {

  let deployCommand = new DeployGit()
  deployCommand.execute(config)

  // const result = spawn.sync(
  //   'node', [require.resolve('./deploy')].concat(process.argv), {
  //     stdio: 'inherit'
  //   }
  // )
  // process.exit(result.status)
}