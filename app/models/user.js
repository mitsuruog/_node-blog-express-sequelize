'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true
  },
  password: String,
  admin: {
    type: Boolean,
    default: false
  }
});

//////////// Virtuals

//////////// Validations

UserSchema
  .path('email')
  .validate((value) => {
    return /\S+@\S+\.\S+/.test(value);
  }, 'Invalid email format.');

//////////// Hooks

//////////// Instance Methods

UserSchema.methods = {
  authenticate(password) {
    // TODO 本当はパスワードハッシュ化したほうがいいよ。。。
    return this.password === password;
  }
};

//////////// Static Methods

module.exports = mongoose.model('User', UserSchema);
