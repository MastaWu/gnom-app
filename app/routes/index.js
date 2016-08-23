module.exports = function(con) {

    const routes = require('express').Router();

    const deals = require('./deals/')(con);

    routes.use('/deals', deals);

    routes.get('/', function(req, res){
        res.status(202).json({ message: "Welcome!" });
    });
};