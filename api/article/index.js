'use strict';

var express = require('express');
var controller = require('./article.controller');
var auth = require('../../routes/auth/auth.service');

var router = express.Router();

router.get('/', auth.authorize, controller.findAll);
router.post('/', auth.authorize, controller.create);
router.put('/:id', auth.authorize, controller.update);
router.delete('/:id', auth.authorize, controller.remove);

module.exports = router;
