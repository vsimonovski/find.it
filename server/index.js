let express = require('express');
let app = express();
let request = require('request');

app.get('/', function (req, res) {
    request
        .get('https://api.github.com/search/repositories?q=topic:javascript+type=user', {
            headers: {
                Authorization: 'Basic 521dc5d840faa41f6a0ed237d2ce4d29560a06ab'
            }
        })
        .on('response', (data) => {
            res.json(data);
        });
});

app.listen('2020');
