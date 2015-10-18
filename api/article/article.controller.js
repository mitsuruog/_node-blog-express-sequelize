'use strict';

exports.findAll = function(req, res) {
  req.collections.articles.find({}, {
    sort: {
      _id: -1
    }
  }).toArray((err, articles) => {
    if(err) return next(err);
    res.json({
      articles: articles
    });
  });
}

exports.create = function(req, res) {
}

exports.update = function(req, res) {
}

exports.remove = function(req, res) {
  req.collections.articles.removeById(req.params.id, (err) => {
    res.sendStatus(204);
  });
}
