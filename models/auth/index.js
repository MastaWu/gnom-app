var auth = require('express').Router();
var login = require('./localLogin');
var signup = require('./localSignup');

auth.post('/signup', signup.localSignup);
auth.post('/login', login.localLogin);

module.exports = auth;