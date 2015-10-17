var express = require('express');

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

router.get('/admin', function(req, res) {
  req.collections.articles.find({}, {
    sort: {
      _id: -1
    }
  }).toArray((err, articles) => {
    if(err) return next(err);
    res.render('admin', {
      articles: articles
    });
  });
});

router.get('/new-post', function(req, res) {
  res.render('post');
});

module.exports = router;
