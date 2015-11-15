'use strict';

module.exports = function(app) {

  // 管理者ログイン済みの場合に管理者用メニューを表示するためのmiddleware
  // [MEMO]画面側のルーティングの前でやらないと動作しない
  app.use((req, res, next) => {
    app.locals.admin = req.user && req.user.admin;
    next();
  });

  // Pages
  app.use('/', require('../app/controllers/index'));
  app.use('/auth', require('../app/controllers/auth'));
  app.use('/articles', require('../app/controllers/article'));

  // REST API Routes
  app.use('/api/articles', require('../app/api/article'));

};
