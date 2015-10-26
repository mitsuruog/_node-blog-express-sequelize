module.exports = (app) => {

  var isDevelop = (app.get('env') === 'development');

  function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
  }

  function clientErrorHandler(err, req, res, next) {
    console.log(isDevelop);
    res.status(500).json({
      message: err.message,
      error: isDevelop ? err : {}
    });
    // [MEMO] X-Requested-Withヘッダーを付ける場合はreq.xhrでもいい
    // if (req.xhr) {
    //   res.status(500).json({
    //     message: err.message,
    //     error: isDevelop ? err : {}
    //   });
    // } else {
    //   next(err);
    // }
  }

  function errorHandler(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: isDevelop ? err : {}
    });
  }

  app.use(logErrors);
  // [MEMO] X-Requested-Withヘッダー付けないのでルーティングで判定している
  app.use('/api', clientErrorHandler);
  app.use(errorHandler);

}
