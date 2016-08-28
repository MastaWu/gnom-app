var restaurants = require('express').Router();
var getAllRestaurantDeals = require('./getAllRestaurants');

restaurants.get('/all', getAllRestaurantDeals);
restaurants.get('/', function(req, res) {
    console.log("Someone is retrieving restaurants.");
    res.status(202).json({ message : "This is where you retrieve restaurants!" });
});

module.exports = restaurants;