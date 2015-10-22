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
        return done(null, false, {
          error: 'Invalid password'
        });
      } else {
        return done(null, user);
      }
    }, (err) => {
      done(err);
    });

});
