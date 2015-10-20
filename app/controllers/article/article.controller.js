'use strict';

exports.post = function(req, res) {
}

exports.admin = function(req, res) {
}

exports.create = function(req, res, next) {
  if(!req.body.title ||
      !req.body.slug ||
      !req.body.text) {
      res.render('post', {
        error: 'Fill title, slug and text'
      });
  }
  // TODO ES6s
  var article = {
    title: req.body.title,
    slug: req.body.slug,
    text: req.body.text,
  };
  req.collections.articles.insert(article, (err, newArticle) => {
    if(err) return next(err);
    // TODO errorで正常系のメッセージ投げるの違和感あり・・・
    res.render('post', {
      error: 'Artical was added. Publish it on Admin page.'
    });
  });
}

exports.show = function(req, res, next) {
  req.collections.articles.findOne({
    slug: req.params.slug
  }, (err, article) => {
    if(err) return next(err);
    if(!article.published) return res.send(404);
    res.render('article', article);
  });
}
