// app.js

// Pulling in node modules
var express             = require('express');                       // express
var app                 = express();
var bodyParser          = require('body-parser');                   // body-parser
var mysql               = require('mysql');                        // mysql
var morgan              = require('morgan');
var appConfig           = require('./config/config');               // load configurations
var database            = require('./database/database');
var port                = process.env.PORT || 8080;                 // http port

// Initiate database pool connection
database.initDB(appConfig);

// Setting up bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setting up where static files will be served
app.use('/static', express.static(__dirname + '/public'));

// Log all requests to the console
app.use(morgan('dev'));

// Configure app to handle CORS requests
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    next();
});

// Register all apps to the api route.
var routes = require('./routes/');
app.use('/api', routes);

// When a user requests a page that is not defined, we should send them a 404
// TODO: Create a 404 page.
app.all('*', function(req, res){
    console.log("User requested random page.");
    res.sendfile('landingpage.html', { root: __dirname + "/views/" });
});

// START SERVER
app.listen(port);
console.log('Server has started at port: ' + port + ' \nDate: ' + new Date());

module.exports = app;