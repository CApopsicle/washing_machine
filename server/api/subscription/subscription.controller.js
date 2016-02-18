'use strict';

var _ = require('lodash');

// var authService = require('../../auth/auth.service');
// var User = require('./user.model');
var db = require('../../config/db');


/**
 * Creates a new subscription in the DB.
 *
 * @param req
 * @param res
 */

exports.create = function (req, res) {
  console.log(req.body);
  
  //create this subscription
  var query = "INSERT INTO subscription SET ?";

  var value = {
    id: Date.now(),
    userEmail: req.body.userEmail,
    machineID: req.body.machineID, 
    date: new Date(),
    finish: false
  }

  var createSubs = db.query( query, value, function(err,response) {
    if (err) throw err;
    else{
      console.log("subscription added");
    }
   
    res.send('done');
  });
  console.log(createSubs.sql);
  
};

