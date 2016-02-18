'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./user.controller');
// var auth = require('../../auth/auth.service');

// router.get('/me', auth.isAuthenticated(), controller.getMe);
router.post('/', controller.create);
router.post('/login', controller.login);
router.get('/me',controller.getMe);
router.get('/delete',controller.deleteUser);



module.exports = router;