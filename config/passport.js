
var passport = require('passport');
var db = require('../config/db');
var local = require('./passport/local');

module.exports = () => {

  // serialize sessions
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    db.User.findById(id).then((err, user) => {
      done(err, user)
    });
  });

  // use these strategies
  passport.use(local);

}
