// const ora = require('ora')

// const spinner = ora('Loading template list').start()

// console.log('')
// console.log('hello world')

// spinner.stop()


//test case for build/command

import BuildCommand from '../src/commands/build/build.js'
let buildCmd = new BuildCommand()
buildCmd.execute({
    debug: '',
    archive: ''
})


// babel-node /Users/peter/works/github/taoqianbao/tqb-h5-cli/test/index.js

// babel-node /Users/peter/works/github/taoqianbao/tqb-h5-cli/src/commands/deploy/deploy.js