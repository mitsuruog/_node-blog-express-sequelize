var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

// [MEMO] デフォルトの読み込みパスが./configなので、NODE_CONFIG_DIRを上書きする
process.env.NODE_CONFIG_DIR = './config/environment/';
var config = require('config');

var app = express();

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
app.use(cookieParser(config.secret.cookie));
app.use(express.static(path.join(__dirname, '../public')));
app.use(session({
  secret: config.secret.session,
  resave: true,
  saveUninitialized: true,
  store: new RedisStore({
    url: config.redis.uri
  })
}));

app.use(require('flash')());

// passport settings
require('./passport')(app);

// use passport session
app.use(passport.initialize());
app.use(passport.session());

// Page & REST API Routes
require('./routes')(app);

// catch 404 and forward to error handler
require('./middlewares/notFoundHandler')(app);

// error handlers
require('./middlewares/errorHandler')(app);

module.exports = app;
