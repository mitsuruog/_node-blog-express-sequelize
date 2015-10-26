var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

var app = express();

require('dotenv').config({
  path: 'config/environment/.env.' + app.get('env')
});

app.locals.title = 'blog-express';

// view engine setup
app.set('views', path.join(__dirname, '../app/views'));
app.set('view engine', 'jade');

// responseにx-powered-byヘッダーを出力しないようにする
app.set('x-powered-by', false);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, '../public')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new RedisStore({
    url: process.env.REDIS_URL
  })
}));

app.use(require('flash')());

// Persistent
require('./db')(app);

// passport settings
require('./passport')(app);

// use passport session
app.use(passport.initialize());
app.use(passport.session());

// Page & REST API Routes
require('./routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
require('./middlewares/errorHandler')(app);

module.exports = app;
