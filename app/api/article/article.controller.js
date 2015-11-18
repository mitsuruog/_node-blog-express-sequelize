'use strict';

var db = require('../../../config/db');

exports.findAll = function(req, res, next) {
  db.Article.findAll({
      order: 'id DESC',
    })
    .then((articles) => {
      res.json({
        articles: articles,
      });
    }, (err) => {
      return next(err);
    });
};

exports.update = function(req, res, next) {

  db.Article.findById(req.params.id)
    .then((article) => {
      // 記事の公開フラグを変更する
      article.published = !article.published;
      return article;
    })
    .then((article) => {
      return article.save();
    })
    .then((article) => {
      res.json({
        article: article,
      });
    })
    .catch((err) => {
      return next(err);
    });

};

exports.remove = function(req, res, next) {
  db.Article.destroy({
      where: {
        id: req.params.id,
      },
    })
    .then(() => {
      res.sendStatus(204);
    }, (err) => {
      return next(err);
    });
};
