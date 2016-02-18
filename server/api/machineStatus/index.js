'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./machineStatus.controller');
// var auth = require('../../auth/auth.service');

// router.get('/me', auth.isAuthenticated(), controller.getMe);

router.get('/',controller.getStatus);


module.exports = router;