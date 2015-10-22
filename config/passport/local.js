var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = mongoose.model('User');

module.exports = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, done) => {
  User.findOne({
      email: email
    })
    .exec()
    .then((user) => {
      if (!user || !user.authenticate(password)) {
        return done(null, null, 'Invalid email or password');
      } else {
        return done(null, user);
      }
    }, (err) => {
      return done(err);
    });

});
