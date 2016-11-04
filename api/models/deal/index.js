// GET all deals
var deal = require('express').Router();
var getAllDeals = require('./getAllDeals');
var getDeal = require('./getDeal');
var updateDeal = require('./updateDeal');
var createDeal = require('./createDeal');
var deleteDeal = require('./deleteDeal');
var upload = require('./uploadPicture');
var requireAuth = require('../auth/checkAuthentication');
var requireRole = require('../auth/requireRole');
var userRole = require('../user/userRole');

// Retrieve all deal available from the database
deal.get('/all', getAllDeals);

// Retrieve the deal from the database with id from req.params
deal.get('/:id', getDeal);

// Create a new deal in the database
deal.post('/', requireAuth.checkAuth, requireRole.requireRole(userRole.restaurantOwner), upload.uploadImage.array('files'), createDeal);

// Update the deal in the database with the id from req. params
deal.post('/:id', requireAuth.checkAuth, requireRole.requireRole(userRole.restaurantOwner), updateDeal);

// Delete the deal in the database with the id from req. params
deal.delete('/:id', requireAuth.checkAuth, requireRole.requireRole(userRole.restaurantOwner), deleteDeal);

module.exports = deal;

