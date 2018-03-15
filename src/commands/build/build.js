process.env.NODE_ENV = 'production'

const fs = require('fs-extra')
const path = require('path')
const util = require('util')
const chalk = require('chalk')
const _ = require('lodash')
const webpack = require('webpack')
const clearConsole = require('react-dev-utils/clearConsole')
const webpackConfig = require('../../webpack/webpack.config.build.js')
const archiver = require('archiver')

/**
 * 
 */
export default class BuildComd {

  /**
   * init 
   */
  async execute(opts) {

    const buildPath = webpackConfig.output.path   //build dist path
    const debug = opts.debug              //process.argv[2]
    this.archiveName = opts.archiveName   //process.argv[3]

    // clearConsole()

    if (debug) {
      let value = ''
      if (debug === '.') {
        value = webpackConfig
      } else {
        value = _.get(webpackConfig, debug)
      }

      console.log('')
      console.log(
        chalk.yellow('[DEBUG] ') +
        'webpack config   KEY: ' +
        chalk.yellow(debug)
      )
      console.log(
        chalk.yellow('[DEBUG] ') +
        'webpack config VALUE: ' +
        chalk.yellow(util.inspect(value, {
          depth: null
        }))
      )
      console.log()
    }
    console.log('')
    console.log(chalk.cyan('  Prepare build ...'))
    console.log('')
    console.log(chalk.cyan('  Empty directory: ') + chalk.cyan.inverse(buildPath))
    fs.emptyDirSync(buildPath)

    await this.build()
  }

  /**
   * build
   */
  build() {

    console.log('')
    console.log(chalk.cyan('  Build begin ...'))
    console.log('')

    let archiveName = this.archiveName

    return new Promise((resolve, reject) => {

      webpack(webpackConfig, function (err, stats) {

        if (err) {
          console.log(chalk.red(err))
          reject()
          throw err
        }

        process.stdout.write(stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false
        }) + '\n')

        console.log('')
        console.log(chalk.green('  Build finished.'))
        console.log('')

        if (archiveName) {
          console.log(chalk.yellow('  Archive begin ...'))
          console.log('')
          const archivePath = webpackConfig.output.path
          let outputPath = path.dirname(archivePath)
          let archiveType = 'zip'
          if (archiveName === 'true') {
            outputPath = path.join(outputPath, path.basename(archivePath) + '.' + archiveType)
          } else {
            outputPath = path.join(outputPath, archiveName)
            archiveType = path.extname(archiveName).slice(1)
          }

          const archive = archiver(archiveType)
          const output = fs.createWriteStream(outputPath)
          output.on('close', function () {
            console.log(chalk.yellow('  Archive finished, output: ') + chalk.bgYellow(outputPath) + ' ' + chalk.bgYellow(archive.pointer() + ' bytes'))
            console.log('')
          })
          archive.on('warning', function (err) {
            if (err.code === 'ENOENT') {
              console.log(chalk.red('  Archive warn: ' + err))
            } else {
              console.log(chalk.red('  Archive error: ' + err))
            }
          })
          archive.on('error', function (err) {
            console.log(chalk.red('  Archive error: ' + err))
          })
          archive.pipe(output)
          archive.directory(archivePath, false)
          archive.finalize()
        }

        resolve()
      })

    })
  }

}