// GET users
var users = require('express').Router();
var getAllUsers = require('./getAllUsers');

// Get all users available from the database
users.get('/all', getAllUsers);

module.exports = users;

