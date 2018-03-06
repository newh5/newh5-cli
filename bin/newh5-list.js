#!/usr/bin/env node

const ora = require('ora')
const axios = require('axios')
const spinner = ora('Loading template list').start()
const reposUrl = 'https://api.github.com/users/newh5-templates/repos'

// const request = require('request')
// request({
//     url: reposUrl,
//     headers: {
//         'User-Agent': 'elf-cli'
//     }
// }, function (err, res, body) {
//     console.log(body)
// })

axios.get(reposUrl, {
    headers: { 'User-Agent': 'elf-cli' }
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