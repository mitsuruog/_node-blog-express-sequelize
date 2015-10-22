'use strict';

var express = require('express');
var controller = require('./auth.controller');
var passport = require('passport');

var router = express.Router();

router.get('/login', controller.login);

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    // [MEMO] infoはvalidationの生エラー情報だが、ここではあえてそのまま返さないような実装にしている
    if (err) return next(err);
    if (!user) {
      req.flash('error', 'Something went wrong, please try again.');
      return res.redirect('/auth/login');
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect('/admin');
    })(req, res, next);
  })(req, res, next);
});

router.get('/logout', controller.logout);

module.exports = router;
