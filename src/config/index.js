const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const _ = require('lodash')
const { isExist } = require('../tools/utils.js')
const defaultConfig = require('./default.js')
const { CONFIG_FILENAME } = require('./const.js')
let config = {}                                   //user's custom configs
import getConfig from './getConfig.js'            //dynamic configs

let dynamicConfigs = getConfig({ name: path.basename(process.cwd()) })

const appDirectory = fs.realpathSync(process.cwd())
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath)
}
function resolveOwn(relativePath) {
  return path.resolve(__dirname, '..', relativePath);
}

const configPath = resolveApp(CONFIG_FILENAME)
try {
  if (isExist(configPath, 'file')) {
    config = require(configPath)
  }
} catch (err) {
  console.log('')
  console.log('Load config file: ' + chalk.cyan(configPath) + ' occur error!')
  console.log('')
  console.error(err)
  process.exit(1)
}

module.exports = _.merge(defaultConfig, dynamicConfigs, config)
