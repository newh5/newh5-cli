#!/usr/bin/env node --harmony

const ora = require('ora')
const axios = require('axios')
import globalConfig from '../../newh5.config'

/**
* @exports
* @param {Commander} commander 定义命令的基本类库实例
*/
export default commander => {
    commander
        .command('list')
        .description('list templates')
        .action(() => {
            Init()
        })
}

/**
 * init
 */
function Init() {
    const spinner = ora('Loading template list').start()

    axios.get(globalConfig.TemplateRepoAPIUrl, {
        headers: { 'User-Agent': 'newh5-cli' }
    })
        .then(response => {
            spinner.stop()
            let { status, statusText, headers, config, data } = response
            const requestBody = data
            if (Array.isArray(requestBody)) {

                let deployIndex = requestBody.findIndex(o => o.name == 'newh5-build')
                if (deployIndex >= 0) {
                    requestBody.splice(deployIndex, 1)
                }
                // requestBody = requestBody.filter(o => o.name != 'newh5-build')

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