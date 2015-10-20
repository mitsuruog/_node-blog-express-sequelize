var express = require('express');
var auth = require('../../config/middlewares/authorization');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.collections.articles.find({
      published: true
    }, {
    sort: {
      _id: -1
    }
  }).toArray((err, articles) => {
    if(err) return next(err);
    res.render('index', {
      articles: articles
    });
  });
});

router.get('/admin', auth.authorize, function(req, res) {
  res.render('admin');
});

router.get('/new-post', auth.authorize, function(req, res) {
  res.render('post');
});

module.exports = router;
