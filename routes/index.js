var passport = require('passport');
var routes = require('express').Router();

var auth = require('../models/auth/index');
var user = require('../models/user/index');
var deal = require('../models/deal/index');
var order = require('../models/order/index');
var restaurant = require('../models/restaurant/index');

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/deal', deal);
routes.use('/order', order);
routes.use('/restaurant', restaurant);

module.exports = routes;

