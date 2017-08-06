const express = require('express');
const cors = require('cors');
const application = express();
const apiai = require('apiai');
const axios = require('axios');
const githubData = require('./githubData');
const req = require('request');
const reqprom = require('request-promise');

application.use(cors());
const app = apiai(process.env.APIAI_TOKEN);
const GITHUB_TOKEN = process.env.GITHUB_API_TOKEN;

application.get('/params', (req, res) => {
    const request = app.textRequest(req.query.q, {
        sessionId: 'tebra'
    });

    request.on('response', async function (response) {
        const data = response.result.parameters;
        const language = data.language;
        const location = Object.values(data.location)[0];

        let paramObj = {
            language: language,
            location: location
        };

        res.json(paramObj);
    });

    request.end();
});

application.get('/find', (req, res) => {
    console.log('/find');
    let userDetails = [];
    const request = app.textRequest(req.query.q, {
        sessionId: 'findDev'
    });
    let result = [];
    request.on('response', async function (response) {
        const data = response.result.parameters;
        const language = data.language;
        const location = Object.values(data.location)[0];
        const users = await githubData(language, location);
        const urls = users.map(user => `${user.url}?access_token=${GITHUB_TOKEN}`);

        const promises = urls.map(async url => await reqprom({
            url: url,
            headers: {
                'User-Agent': 'vsimonovski'
            }
        }, (err, res, body) => {
            return body;
        }));

        Promise.all(promises).then((data) => {

            data.forEach((user) => {
                user = JSON.parse(user);
                if (user.hireable === true) {
                    let tmp = {
                        name: user.login,
                        email: user.email,
                        image: user.avatar_url,
                        bio: user.bio,
                        link: user.html_url
                    };
                    result.push(tmp);
                }
            });
            res.json(result);
        });
    });

    request.on('error', function (error) {
        console.log(error);
    });

    request.end();
});


application.listen(7070);
