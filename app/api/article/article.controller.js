'use strict';

var Article = require('../../models/article');

exports.findAll = function(req, res, next) {
  Article.find({})
    .sort({
      _id: -1
    })
    .exec()
    .then((articles) => {
      res.json({
        articles: articles
      });
    }, (err) => {
      return next(err);
    });
}

exports.update = function(req, res, next) {

  Article.findById(req.params.id)
    .exec()
    .then((article) => {
      if (!article) return res.sendStatus(404);
      // 記事の公開フラグを変更する
      article.published = !article.published;
      return article;
    })
    .then((article) => {
      article.save().then(() => {
        res.json({
          article: article
        });
      });
    }, (err) => {
      return next(err);
    });

}

exports.remove = function(req, res, next) {
  Article.findByIdAndRemove(req.params.id)
    .exec()
    .then(() => {
      res.sendStatus(204);
    }, (err) => {
      return next(err);
    });
}
