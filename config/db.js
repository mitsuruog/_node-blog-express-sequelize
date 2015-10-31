'use strict';

var mongoose = require('mongoose');

module.exports = function(app, config) {

  mongoose.connect(config.mongodb.uri, {
    db: {
      safe: true
    }
  });

  app.use(function(res, req, next) {
    // サーバー側でSessionを見て管理者判定する
    if (req.session && req.session.admin) {
      app.locals.admin = true;
    }
    next();
  });

}
