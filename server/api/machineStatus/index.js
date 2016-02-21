'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./machineStatus.controller');

router.get('/',controller.getStatus);


module.exports = router;