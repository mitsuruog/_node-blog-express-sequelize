'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    default: 'New Post'
  },
  text: String,
  published: {
    type: Boolean,
    default: false
  }
});

//////////// Virtuals

ArticleSchema
  .virtual('slug')
  .set((value) => {
    return value.toLowerCase().replace(' ', '-');
  });

//////////// Validations

ArticleSchema
  .path('title')
  .validate((value) => {
    return value.length <= 120;
  }, 'Title is too long(120 max)');

//////////// Hooks

//////////// Instance Methods

//////////// Static Methods

module.exports = mongoose.model('Article', ArticleSchema);
