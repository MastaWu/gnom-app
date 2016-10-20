// app.js
// Pulling in node modules

process.env.NODE_ENV = 'dev';

var express             = require('express');                       // express for basic http requests
var app                 = express();
var bodyParser          = require('body-parser');                   // body-parser for body messages
var morgan              = require('morgan');                        // morgan for request logging
var path                = require('path');                          // passport for authentication
var paypal              = require('paypal-rest-sdk');
var appConfig           = require('./config/config');               // load configurations
var database            = require('./database/database');
var port                = process.env.PORT || 8080;                 // http port
var environment         = process.env.NODE_ENV === 'dev';

// Initiate database pool connection
database.initDB(appConfig);

paypal.configure(appConfig.paypal);

// Setting up bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Log all requests to the console
app.use(morgan('dev'));

// Configure app to handle CORS requests
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    next();
});

if(environment) {
    console.log("Environment is dev? " + environment);
    app.use('/img',express.static(path.join(__dirname, '/public/dist/img')));
    app.use('/js',express.static(path.join(__dirname, '/public/dist/js')));
    app.use('/css',express.static(path.join(__dirname, '/public/dist/css')));
    app.use('/views', express.static(path.join(__dirname, '/public/dist/views')));
}

// Register all apps to the api route.
var routes = require('./routes/');
app.use('/api', routes);

// When a user requests a page that is not defined, we should send them a 404
if(environment) {
    app.all('/*', function (req, res)
    {
        console.log("App.js: Serving html file");
        res.sendfile(path.join(__dirname, '/public/dist/index.html'));
    });
}

// START SERVER
app.listen(port);
console.log('Server has started at port: ' + port + ' \nDate: ' + new Date());

module.exports = app;