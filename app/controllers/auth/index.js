'use strict';

var express = require('express');
var controller = require('./auth.controller');
var passport = require('passport');

var router = express.Router();

router.get('/login', controller.login);

router.post('/login', passport.authenticate('local', {
  successRedirect: '/admin',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid email or password.'
}));

router.get('/logout', controller.logout);

module.exports = router;
