'use strict';

module.exports = function(app) {

  // Pages
  app.use('/', require('../app/controllers/index'));
  app.use('/auth', require('../app/controllers/auth'));
  app.use('/articles', require('../app/controllers/article'));

  // REST API Routes
  app.use('/api/articles', require('../app/api/article'));

};
