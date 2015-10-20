'use strict';

module.exports = function(app) {

  var mongoskin = require('mongoskin');
  var dbUrl = process.env.MONGOLAB_URI || 'mongodb://192.168.99.100:27017/blog';
  var db = mongoskin.db(dbUrl, {
    safe: true
  });
  var collections = {
    users: db.collection('users'),
    articles: db.collection('articles')
  };

  // TODO
  // 全リクエストのたびにmondodbの中身をチェックしているけど
  // ここでやるべきかは再考の余地あり
  // というか動作してない！？
  app.use(function(req, res, next) {
    if(!collections.articles || !collections.users) {
      return next(new Error('No collections :('));
    }
    req.collections = collections;
    return next();
  });

  app.use(function(res, req, next) {
    // サーバー側でSessionを見て管理者判定する
    if(req.session && req.session.admin) {
      app.locals.admin = true;
    }
    next();
  });

}
