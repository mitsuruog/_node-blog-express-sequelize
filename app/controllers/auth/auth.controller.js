'use strict';

var User = require('../../models/user');

exports.login = function(req, res) {
  res.render('login');
}

exports.authenticate = function(req, res, next) {

  if (!req.body.email || !req.body.password) {
    return res.render('login', {
      error: 'Please enter your email and password'
    });
  }

  User.findOne({
      email: req.body.email,
      password: req.body.password
    })
    .exec()
    .then((user) => {
      if (!user) {
        return res.render('login', {
          error: 'Incorrect email & password combination.'
        });
      }
      req.session.user = user;
      req.session.admin = user.admin;
      res.redirect('/admin');
    }, (err) => {
      return next(err);
    });
}

exports.logout = function(req, res) {
  req.session.destroy();
  res.redirect('/');
}
