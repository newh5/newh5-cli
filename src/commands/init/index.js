#!/usr/bin/env node --harmony

const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')
const download = require('download-git-repo')
const inquirer = require('inquirer')
const ora = require('ora')
const { CONFIG_FILENAME } = require('../../config/const.js')

/**
 * 
 * @param {*} commander 
 */
function run(commander) {

  let destPath = commander.destPath || '.'
  let isCurrent = destPath === '.'
  destPath = path.resolve(destPath)

  let template = 'base' // default use `base` template
  if (commander.template) template = commander.template
  let isUseDefault = !~template.indexOf('/')
  if (isUseDefault) template = `newh5-templates/${template}`

  const clone = commander.clone || false

  if (fs.existsSync(destPath)) {
    inquirer.prompt([{
      type: 'confirm',
      message: isCurrent ?
        'Init project in current directory ?' :
        'Target directory already exists. Are you continue ?',
      name: 'ok'
    }]).then(function (answers) {
      if (answers.ok) initFiles(template, destPath)
    })
  } else {
    initFiles(template, destPath)
  }

  /**
   * 
   * @param {*} from 
   * @param {*} to 
   */
  function initFiles(from, to) {
    const spinner = ora('Downloading template').start()
    download(from, to, { clone }, function (err) {
      spinner.stop()
      if (err) {
        console.log('')
        console.log('  Failed to download repo ' + chalk.red(template) + ': ' + err.message.trim())
        console.log('')
      } else {
        // copy default config file
        if (isUseDefault) {
          const defualtConfigPath = path.join(__dirname, '../../settings/default.out.js')
          const destConfigPath = path.join(to, CONFIG_FILENAME)
          fs.copySync(defualtConfigPath, destConfigPath)
        }

        console.log('')
        console.log('  Base on ' + chalk.green(template) + ' init project success')
        console.log('')
        if (commander.destPath) {
          console.log(chalk.cyan('  $ cd ' + commander.destPath + ' && npm install'))
        } else {
          console.log(chalk.cyan('  $ npm install'))
        }
        console.log(chalk.cyan('  $ newh5 start'))
        console.log('')
      }
    })
  }
}


/**
* @exports
* @param {Commander} commander 定义命令的基本类库实例
*/
export default commander => {
  commander
    .command('init')
    .description('init projects')
    .option('-p --destPath', 'set dest path when init')
    .option('-t, --template <template>', 'set template when init')
    .option('-c, --clone', 'use git clone')
    .action(() => {
      run(commander)
    })
};