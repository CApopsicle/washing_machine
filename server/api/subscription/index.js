'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./subscription.controller');


router.post('/', controller.create);




module.exports = router;