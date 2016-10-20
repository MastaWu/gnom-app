var order = require('express').Router();
var createOrder = require('./createOrder');
var getAllOrders = require('./getAllOrders');
var getOrder = require('./getOrder');
var updateOrder = require('./updateOrder');
var deleteOrder = require('./deleteOrder');
var requireAuth = require('../auth/checkAuthentication');
var requireRole = require('../auth/requireRole');
var userRole = require('../user/userRole');

// Retrieve all deal available from the database
order.get('/all', getAllOrders);

// Retrieve the deal from the database with id from req.params
order.get('/:id', getOrder);

// Create a new deal in the database
order.post('/', requireAuth.checkAuth, requireRole.requireRole(userRole.restaurantOwner), createOrder);

// Update the deal in the database with the id from req. params
order.post('/:id', requireAuth.checkAuth, requireRole.requireRole(userRole.restaurantOwner), updateOrder);

// Delete the deal in the database with the id from req. params
order.delete('/:id', requireAuth.checkAuth, requireRole.requireRole(userRole.restaurantOwner), deleteOrder);

module.exports = order;
