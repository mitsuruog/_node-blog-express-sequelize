'use strict';

var express = require('express');
var controller = require('./article.controller');
var auth = require('../../../config/middlewares/authorization');

var router = express.Router();

router.get('/', auth.authorize, controller.findAll);
router.put('/:id', auth.authorize, controller.update);
router.delete('/:id', auth.authorize, controller.remove);

module.exports = router;
