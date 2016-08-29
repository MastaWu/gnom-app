// GET all deals
var deals = require('express').Router();
var getAllDeals = require('./getAllDeals');
var getDeal = require('./getDeal');

// Retrieve all deals available from the database
deals.get('/all', getAllDeals);

// Retrieve the deal from the database with id from req.params
deals.get('/:id', getDeal);

module.exports = deals;
