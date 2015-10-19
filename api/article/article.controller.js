'use strict';

exports.findAll = function(req, res, next) {
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

exports.update = function(req, res, next) {
  req.collections.articles.findById(req.params.id, (err, article) => {
    if(err) return next(err);
    if(!article) return res.sendStatus(404);
    // 記事の公開フラグを変更する
    article.published = !article.published;
    req.collections.articles.updateById(req.params.id, {
      $set: article
    }, (err, count) => {
      if(err) return next(err);
      res.json({
        article: article
      });
    });
  });
}

exports.remove = function(req, res) {
  req.collections.articles.removeById(req.params.id, (err) => {
    res.sendStatus(204);
  });
}
