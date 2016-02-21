'use strict';

var _ = require('lodash');


var db = require('../../config/db');


/**
 * Creates a new subscription in the DB.
 *
 * @param req
 * @param res
 */

exports.create = function (req, res) {
  
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
  
};

exports.getSubscription = function(req, res){
  //get subscription data
  var query = "SELECT * FROM subscription WHERE `machineID` = ?  AND `userEmail` = ?";

  var value = [req.body.machineID, req.body.userEmail]

  var getSubs = db.query( query, value, function(err,rows) {
    if (err) throw err;
    else{
      if (rows[0].length != 0) {res.send(true);}
      else{res.send(false);}
    }
   
    
  });
}

