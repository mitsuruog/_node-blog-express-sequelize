'use strict';

exports.authorize = function(req, res, next) {
  if(req.session && req.session.admin) {
    return next();
  } else {
    return res.sendStatus(401);
  }
}
