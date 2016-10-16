// GET all restaurants
var restaurant = require('express').Router();
var getAllRestaurantDeals = require('./getAllRestaurants');
var getRestaurant = require('./getRestaurant');

// Get all order available from the database
restaurant.get('/all', getAllRestaurantDeals);

// Retrieve the restaurant from the database with id from req.params
restaurant.get('/:id', getRestaurant);

module.exports = restaurant;