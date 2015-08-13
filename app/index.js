var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    oauth2 = require('./oauth2');

app.use(bodyParser.json());
app.use(passport.initialize());

app.get('/', function (req, res) {
    res.send('Hello World!');
});

// Passport configuration
require('./auth');


app.post('/oauth/token', oauth2.token);

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
