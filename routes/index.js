var routes = require('express').Router();
var deals = require('../models/deals/index');
var restaurants = require('../models/restaurants/index');

routes.use('/deals', deals);
routes.use('/restaurants', restaurants)

routes.get('/', function(req, res){
    res.status(202).json({ message: "Welcome!" });
});

module.exports = routes;