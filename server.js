// server.js

// Pulling in node modules
const express             = require('express');                       // express
const app                 = express();
const bodyParser          = require('body-parser');                   // body-parser
const mysql               = require('mysql');                         // mysql
const morgan              = require('morgan');
const appConfig           = require('./config/config');               // load configurations
const database            = require('./app/database/database');
const port = process.env.PORT || 8080;                                // http port

database.initDB(appConfig);

// setting up bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// setting up where static files will be served
app.use(express.static(__dirname + '/public'));

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
const routes = require('./app/routes/');
app.use('/', routes);

app.get('*', function(req, res){
    console.log("User requested main page.");
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// START SERVER
app.listen(port);
console.log('Server has started at port: ' + port + ' \nDate: ' + new Date());
