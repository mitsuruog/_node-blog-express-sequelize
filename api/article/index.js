'use strict';

var express = require('express');
var controller = require('./article.controller');

var router = express.Router();

router.get('/', controller.findAll);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
