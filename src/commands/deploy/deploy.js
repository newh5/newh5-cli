// 因为使用了babel-cli,可以在node中使用es6; 具体用法 http://babeljs.io/docs/usage/cli/

const inquirer = require('inquirer')
import DeployGit from './deploy-git'

async function run() {
    let deployCommand = new DeployGit()
    await deployCommand.execute({
        name: 'new project',
        commitInfo: 'commit message'
    })
    console.log('done')
}

run()