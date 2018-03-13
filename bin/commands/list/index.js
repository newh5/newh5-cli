#!/usr/bin/env node --harmony
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var ora = require('ora');
var axios = require('axios');
var reposUrl = 'https://api.github.com/users/newh5-templates/repos';

/**
 * init
 */
function Init() {
    var spinner = ora('Loading template list').start();

    axios.get(reposUrl, {
        headers: { 'User-Agent': 'newh5-cli' }
    }).then(function (response) {
        spinner.stop();
        var status = response.status,
            statusText = response.statusText,
            headers = response.headers,
            config = response.config,
            data = response.data;

        var requestBody = data;
        if (Array.isArray(requestBody)) {
            console.log();
            console.log('  All templates:');
            console.log();
            requestBody.forEach(function (repo) {
                return console.log('      - ' + repo.name + '  ' + repo.description);
            });
            console.log();
            console.log('  You can base on template init project:');
            console.log();
            console.log('      newh5 init -t ' + requestBody[0].name);
            console.log();
        } else {
            console.error(requestBody.message);
        }
    }).catch(function (error) {
        spinner.stop();
        console.error(error);
    });
}

/**
* @exports
* @param {Commander} commander 定义命令的基本类库实例
*/

exports.default = function (commander) {
    commander.command('list').description('list templates').action(function () {
        Init();
    });
};