// 因为使用了babel-cli,可以在node中使用es6; 具体用法 http://babeljs.io/docs/usage/cli/

const inquirer = require('inquirer')

async function isCDN() {
    return new Promise(resolve => {
        inquirer.prompt(
            [{
                type: 'list',
                name: 'isCDN',
                message: 'Will you upload static files to CDN? [CTRL-C to Exit]',
                choices: ['no', 'yes']
            }]
        ).then(function (answer) {
            resolve(answer)
        })
    })
}


async function run() {
    let result = await isCDN()
    console.log(result)
}

run()