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