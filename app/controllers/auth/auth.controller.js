'use strict';

exports.login = function(req, res) {
  res.render('login');
};

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};
