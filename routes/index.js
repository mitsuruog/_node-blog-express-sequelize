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
  });
});

module.exports = router;
