// app.js
process.env.NODE_ENV = 'dev';

// Pulling in node modules
var express             = require('express');                       // express for basic http requests
var app                 = express();
var bodyParser          = require('body-parser');                   // body-parser for body messages
var morgan              = require('morgan');                        // morgan for request logging
var path                = require('path');                          // passport for authentication
var appConfig           = require('./config/config');               // load configurations
var database            = require('./database/database');
var port                = process.env.PORT || 8080;                 // http port
var environment         = process.env.NODE_ENV === 'dev';

// Initiate database pool connection
database.initDB(appConfig);

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
    console.log(environment);
    app.use('/img',express.static(path.join(__dirname, '/public/dist/img')));
    app.use('/js',express.static(path.join(__dirname, '/public/dist/js')));
    app.use('/css',express.static(path.join(__dirname, '/public/dist/css')));
    app.use('/views', express.static(path.join(__dirname, '/public/dist/views')));
    app.get('/', function(req, res) {
        console.log("App.js: Serving html file");
        res.sendfile(path.join(__dirname, '/public/dist/index.html'));
    });
}

// Register all apps to the api route.
var routes = require('./routes/');
app.use('/api', routes);

// When a user requests a page that is not defined, we should send them a 404
// TODO: Create a 404 page.
app.all('*', function(req, res){
    console.log("User requested random page.");
});

// START SERVER
app.listen(port);
console.log('Server has started at port: ' + port + ' \nDate: ' + new Date());

module.exports = app;