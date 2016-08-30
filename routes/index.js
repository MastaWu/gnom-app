var routes = require('express').Router();
var deals = require('../models/deals/index');
var restaurants = require('../models/restaurants/index');

routes.use('/deal', deals);
routes.use('/restaurant', restaurants);

routes.get('/', function(req, res){
    res.status(200).json({ message: "Welcome!" });
});

module.exports = routes;