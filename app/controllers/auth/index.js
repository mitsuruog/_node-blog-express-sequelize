'use strict';

var express = require('express');
var controller = require('./auth.controller');

var router = express.Router();

router.get('/login', controller.login);
router.post('/login', controller.authenticate); // TODO 名前が微妙
router.get('/logout', controller.logout);

module.exports = router;
