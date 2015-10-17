'use strict';

module.exports = function(app) {

  // Pages
  app.use('/', require('./routes/index'));
  app.use('/auth', require('./routes/auth'));
  app.use('/articles', require('./routes/article'));

  // REST API Routes
  app.use('/api/articles', require('./api/article'));

};
