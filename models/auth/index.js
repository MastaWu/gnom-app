var auth = require('express').Router();
var login = require('./localLogin');
var signup = require('./localSignup');
var instagram = require('./instagramLogin');

auth.post('/signup', signup.localSignup);
auth.post('/login', login.localLogin);
auth.post('/instagram', instagram.instagramLogin);

module.exports = auth;