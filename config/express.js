var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.locals.title = 'blog-express';

// view engine setup
app.set('views', path.join(__dirname, '../app/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET || 'cookie-secret'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(session({
  secret: process.env.SESSION_SECRET || 'session-secret',
  resave: true,
  saveUninitialized: true,
  store: new RedisStore({
    url: process.env.REDIS_URL || 'redis://192.168.99.100:6379',
    db: 1
  })
}));

// Persistent
require('./db')(app);

// Page & REST API Routes
require('./routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

  // APIアクセスの場合はエラーをJSONで返却するようにした
  app.use('/api', function(err, req, res, next) {
    res.status(500).json({
      message: err.message,
      error: err
    });
  });

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });

}

// production error handler
// no stacktraces leaked to user

// APIアクセスの場合はエラーをJSONで返却するようにした
app.use('/api', function(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    error: err
  });
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
