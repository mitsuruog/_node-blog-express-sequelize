var express = require('express');
var auth = require('../../config/middlewares/authorization');
var Article = require('../models/article');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  Article.find({
      published: true
    })
    .sort({
      _id: -1
    })
    .exec()
    .then((articles) => {
      res.render('index', {
        articles: articles
      });
    }, (err) => {
      return next(err);
    });
});

router.get('/admin', auth.authorize, function(req, res) {
  res.render('admin');
});

router.get('/new-post', auth.authorize, function(req, res) {
  res.render('post');
});

module.exports = router;
