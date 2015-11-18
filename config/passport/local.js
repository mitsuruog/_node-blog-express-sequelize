var LocalStrategy = require('passport-local').Strategy;
var db = require('../../config/db');

module.exports = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (email, password, done) => {
  db.User.findOne({
      where: {
        email: email,
      },
    })
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
