'use strict';

exports.login = function(req, res) {
  res.render('login');
}

exports.authenticate = function(req, res) {
  res.redirect('/admin');
}

exports.logout = function(req, res) {
  res.redirect('/');
}
