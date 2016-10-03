var passportService = require('../models/auth/strategy/passport');
var passport = require('passport');
var routes = require('express').Router();

var auth = require('../models/auth/index');
var deals = require('../models/deals/index');
var restaurants = require('../models/restaurants/index');
var users = require('../models/users/index');

routes.use('/auth', auth);
routes.use('/deals', deals);
routes.use('/restaurants', restaurants);
routes.use('/users', users);

module.exports = routes;

