// server.js

// Pulling in node modules
var express             = require('express');                       // express
var app                 = express();
var bodyParser          = require('body-parser');                   // body-parser
var mysql               = require('mysql');                        // mysql
var morgan              = require('morgan');
var appConfig           = require('./config/config');               // load configurations
var database            = require('./database/database');
var port                = process.env.PORT || 8080;                 // http port

database.initDB(appConfig);

// setting up bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// setting up where static files will be served
// app.use(express.static(__dirname + '/public'));

// log all requests to the console
app.use(morgan('dev'));
// configure app to handle CORS requests
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    next();
});

// Register our routes
var routes = require('./routes/');
app.use('/api/v1', routes);

app.all('*', function(req, res){
    console.log("User requested random page.");
    res.json({ message : "You will be redirected, because the route could not be identified."});
});

// START SERVER
app.listen(port);
console.log('Server has started at port: ' + port + ' \nDate: ' + new Date());
