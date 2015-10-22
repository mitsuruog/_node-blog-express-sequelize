
var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../app/models/user');
var local = require('./passport/local');

module.exports = () => {

  // serialize sessions
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).exec((err, user) => {
      done(err, user)
    });
  });

  // use these strategies
  passport.use(local);

}
