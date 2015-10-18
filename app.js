var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

var mongoskin = require('mongoskin');
var dbUrl = process.env.MONGO_URL || 'mongodb://192.168.99.100:27017/blog';
var db = mongoskin.db(dbUrl, {
  safe: true
});
var collections = {
  users: db.collection('users'),
  articles: db.collection('articles')
};

app.locals.title = 'blog-express';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET || 'cookie-secret'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET || 'session-secret',
  resave: true,
  saveUninitialized: true
}));

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
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
