'use strict';

var express = require('express');
var controller = require('./article.controller');

var router = express.Router();

router.get('/admin', controller.admin);
router.get('/post', controller.post);
router.post('/post', controller.create);
router.get('/:slug', controller.show);

module.exports = router;
