process.env.NODE_ENV = 'development'
process.traceDeprecation = true

const chalk = require('chalk')
const ip = require('ip')
const qrcode = require('qrcode-terminal')

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const clearConsole = require('react-dev-utils/clearConsole')
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages')
const openBrowser = require('react-dev-utils/openBrowser')

const allConfig = require('../../config/index.js')
const webpackConfig = require('../../webpack/webpack.config.dev.js')
const isInteractive = process.stdout.isTTY

let isFirstRun = true
let compiler

function setupCompiler(host, port) {
  compiler = webpack(webpackConfig)

  compiler.plugin('invalid', function () {
    console.log('')
    console.log(chalk.cyan('  Compiling...'))
    console.log('')
  })

  compiler.plugin('done', function (stats) {
    process.stdout.write(stats.toString({
      colors: true,
      reasons: true,
      errorDetails: true,

      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n')

    if (stats.hasErrors()) {
      console.log('')
      console.log(chalk.cyan('  Compiling fail!'))
      console.log('')
      return
    }

    let startUrl = `http://${host}:${port}/newh5/${process.env.Newh5_ProjectName}.html`

    if (isFirstRun) {
      console.log('')
      console.log(chalk.cyan('  Compile finished'))
      console.log('')
      console.log(chalk.cyan('  Webpack dev server running at: '))
      console.log('')
      console.log(chalk.cyan(startUrl))
      console.log('')
      if (allConfig.DEVELOPMENT.enableDisplayQR) {
        qrcode.generate('http://' + host + ':' + port + '/', {
          small: true
        }, function (qrcode) {
          console.log(qrcode)
        })
      }
    }

    isFirstRun = false
  })
}

function runDevServer(host, port) {
  const devServer = new WebpackDevServer(compiler, webpackConfig.devServer)

  devServer.listen(port, (err, result) => {
    if (err) {
      return console.log(err)
    }

    console.log(chalk.cyan('  Starting the development server...'))
    console.log()

    if (isInteractive) {
      let startUrl = `http://${host}:${port}/newh5/${process.env.Newh5_ProjectName}.html`
      openBrowser(startUrl)
    }
  })
}

function run(port) {
  const host = ip.address()
  setupCompiler(host, port)
  runDevServer(host, port)
}

clearConsole()
run(webpackConfig.devServer.port)