'use strict';

var mongoose = require('mongoose');
var dbUrl = process.env.MONGOLAB_URI || 'mongodb://192.168.99.100:27017/blog';

mongoose.connect(dbUrl);

module.exports = function(app) {

  app.use(function(res, req, next) {
    // サーバー側でSessionを見て管理者判定する
    if(req.session && req.session.admin) {
      app.locals.admin = true;
    }
    next();
  });

}
