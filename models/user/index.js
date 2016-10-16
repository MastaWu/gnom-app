// GET users
var user = require('express').Router();
var getAllUsers = require('./getAllUsers');

// Get all user available from the database
user.get('/all', getAllUsers);

module.exports = user;

