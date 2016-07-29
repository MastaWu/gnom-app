// server.js

// Pulling in node modules
var express             = require('express');                       // express
var app                 = express();
var bodyParser          = require('body-parser');                   // body-parser
var mysql               = require('mysql');                         // mysql
var morgan              = require('morgan');

var config              = require('./config/config');               // load configurations
conf = new config();

// port
var port = process.env.PORT || 8080;

var con = mysql.createConnection({
    host: conf.database.host,
    port: conf.database.port,
    user: conf.database.user,
    password: conf.database.password
});

con.connect(function(err) {
    if(err) {
        console.log('Error connecting to the database.');
        return;
    }
    console.log('Connection established.');
});

// setting up bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
// All routes will begin with /api
indexRoute = require('./app/routes/index.js')(app, express, con);

app.get('*', function(req, res){
    console.log("User requested main page.");
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// START SERVER
app.listen(port);
console.log('Server has started at port: ' + port);