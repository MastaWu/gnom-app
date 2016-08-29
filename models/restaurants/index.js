// GET all restaurants
var restaurants = require('express').Router();
var getAllRestaurantDeals = require('./getAllRestaurants');
var getRestaurant = require('./getRestaurant');

// Get all restaurants available from the database
restaurants.get('/all', getAllRestaurantDeals);

// Retrieve the restaurant from the database with id from req.params
restaurants.get('/:id', getRestaurant);

module.exports = restaurants;