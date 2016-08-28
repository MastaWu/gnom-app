var deals = require('express').Router();
var getAllDeals = require('./getAllDeals');

deals.get('/all', getAllDeals);
deals.get('/', function(req, res){
    console.log("Someone is retrieving deals!");
    res.status(200).json({ message : "This is where you retrieve deals!!" });
});

module.exports = deals;
