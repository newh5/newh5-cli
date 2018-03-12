#!/usr/bin/env node --harmony

const ora = require('ora')
const axios = require('axios')
const reposUrl = 'https://api.github.com/users/newh5-templates/repos'

/**
 * init
 */
function Init() {
    const spinner = ora('Loading template list').start()

    axios.get(reposUrl, {
        headers: { 'User-Agent': 'newh5-cli' }
    })
        .then(response => {
            spinner.stop()
            let { status, statusText, headers, config, data } = response
            const requestBody = data
            if (Array.isArray(requestBody)) {
                console.log()
                console.log('  All templates:')
                console.log()
                requestBody.forEach(repo => console.log('      - ' + repo.name + '  ' + repo.description))
                console.log()
                console.log('  You can base on template init project:')
                console.log()
                console.log('      newh5 init -t ' + requestBody[0].name)
                console.log()
            } else {
                console.error(requestBody.message)
            }
        }).catch(error => {
            spinner.stop()
            console.error(error)
        })
}


/**
* @exports
* @param {Commander} commander 定义命令的基本类库实例
*/
export default commander => {
    commander
        .command('list')
        .description('list templates')
        .action(() => {
            Init();
        })
};