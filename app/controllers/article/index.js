'use strict';

var express = require('express');
var controller = require('./article.controller');

var router = express.Router();

router.post('/post', controller.create);
router.get('/:slug', controller.show);

module.exports = router;
