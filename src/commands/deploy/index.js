#!/usr/bin/env node --harmony

const debug = require('debug')('newh5-cli:Deploy')
const chalk = require('chalk')
import DeployGit    from './deploy-git'
import * as gitGepo from '../../tools/git-repo'
import task         from '../../tools/run'

/**
* @exports
* @param {Commander} commander 定义命令的基本类库实例
*/
export default commander => {
  commander
    .command('deploy [env]')    //env=['sit','uat','prod']
    .option('-t, --target <target>', 'set deploy target env when deploy', 'deploy')
    .option('-m, --commitInfo <commitInfo>', 'set commit message when deploy')
    .description('deploy projects')
    .action((env, options) => {
      run({
        name: 'NewPorject',
        target: env || options.target,
        commitInfo: options.commitInfo ? options.commitInfo : ''
      })
    })
}

function run(config) {

  debug('Newh5_BuildPath: %s', process.env.Newh5_BuildPath)

  debug('deploy args = %o', config)

  console.log(chalk.blue(`$ git status -s`))
  const status = gitGepo.gitCommand('status -s')
  console.log(status ? chalk.red(status) : chalk.green('---------------'))

  let deployCommand = new DeployGit()
  // deployCommand.execute(config)
  task(deployCommand.execute.bind(deployCommand, config))
}