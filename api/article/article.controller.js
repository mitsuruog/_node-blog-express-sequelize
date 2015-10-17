'use strict';

exports.findAll = function(req, res) {
}

exports.create = function(req, res) {
}

exports.update = function(req, res) {
}

exports.remove = function(req, res) {
  req.collections.articles.removeById(req.params.id, (err) => {
    res.send(204);
  });
}
