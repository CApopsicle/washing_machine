'use strict';

var _ = require('lodash');
var async = require('async');

// var authService = require('../../auth/auth.service');
// var User = require('./user.model');
var db = require('../../config/db');

exports.getStatus = function (req, res) {

  var macIDs = ["20F85EA97363","20F85EA96EE0"];

  var data = [];

  async.each(macIDs, function(macID, callback){
    var query = "SELECT * FROM plugStatus WHERE `plugID` = ? ORDER BY `timestamp` desc limit 2";
    
    var getTheUser = db.query( query, [macID], function(err,rows) {
      var item = {}
      if (err) callback(err);
      if (rows.length > 0){
        console.log(rows);
        if (rows[0].transitionPeriod == 0){
          item.id = rows[0].plugID;
          item.status = rows[0].status;
          item.percent = accumlatedPercentage[rows[0].period][rows[0].status];
          item.timeLeft = Math.floor(40*(100-item.percent) / 100);
        }else{
          item.id = rows[1].plugID;
          item.status = rows[1].status;
          item.percent = accumlatedPercentage[rows[0].period][rows[0].status];
          item.timeLeft = Math.floor(40*(100-item.percent) / 100);
        }
      }
      data.push(item);
      callback();
    });

    console.log(getTheUser.sql);
  },function(err){
    if (err)
      res.json(401);
    else
      res.send(data);
  })
};

var accumlatedPercentage = [{
  'idle': 100
},{
  'inwater':22,
  'washing':39,
  'outwater':42,
  'drying':46
},{
  'inwater':61,
  'washing':63,
  'outwater':66,
  'drying':70
},{
  'inwater':85,
  'washing':87,
  'outwater':90,
  'drying':95
}]

