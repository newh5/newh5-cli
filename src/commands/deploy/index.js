#!/usr/bin/env node --harmony

const spawn = require('cross-spawn')

/**
* @exports
* @param {Commander} commander 定义命令的基本类库实例
*/
export default commander => {
  commander
    .command('deploy')
    .description('deploy projects')
    .action(() => {
      run()
    })
}


function run() {
  const result = spawn.sync(
    'node', [require.resolve('./deploy')].concat(process.argv), {
      stdio: 'inherit'
    }
  )
  process.exit(result.status)
}