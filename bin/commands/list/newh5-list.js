#!/usr/bin/env node --harmony
'use strict';

var ora = require('ora');
var axios = require('axios');
var spinner = ora('Loading template list').start();
var reposUrl = 'https://api.github.com/users/newh5-templates/repos';

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