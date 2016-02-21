'use strict';

var _ = require('lodash');

var db = require('../../config/db');
var crypto = require('crypto');
var salt = 'NrnzYEO3gK4DavneA/w4Ow==';

function handleError (res, err) {
  return res.status(500).send(err);
}
function encryptPassword(password) {
  if (!password || !salt) { return ''; }
  var saltTemp = new Buffer(salt, 'base64');
  return crypto.pbkdf2Sync(password, saltTemp, 10000, 64).toString('base64');
}
// function makeSalt (){
//   return crypto.randomBytes(16).toString('base64');
// }

/**
 * Creates a new user in the DB.
 *
 * @param req
 * @param res
 */

exports.create = function (req, res) {
  
  // check if user existed
  var checkQuery = "SELECT * FROM user WHERE ?"
  var checkValue = {
    email: req.body.email
  }
  var checkDB = db.query(checkQuery, checkValue,function(err,rows){
    if(err) throw err;
    if(rows.length != 0){
      res.send('email already used!');
    }
    else{
      //create this user
      var query = "INSERT INTO user SET ?";
      var en_password = encryptPassword(req.body.password);

      var value = {
        id: Date.now(),
        phone: req.body.phone,
        name: req.body.name, 
        email: req.body.email,
        password: en_password,
        userID: req.body.userID
      }

      db.query( query, value, function(err,response) {
        if (err) throw err;
        else{
        }
       
        res.send('done');
      });
    }
  });
};
exports.login = function(req, res){

  var query = "SELECT `password`,`name` FROM user WHERE `email` = ?";
  var en_password = encryptPassword(req.body.password);
  var value = [req.body.email];
  
  var getTheUser = db.query( query, value, function(err,rows) {

    if (err) throw err;
    else{
      if(rows[0].password == en_password){//correct
        var data = {userEmail : req.body.email,userName: rows[0].name}
        res.send(data);
      }
      else{//login fail
        res.send(false);
      }
    }
  });
};

/**
 * Return the current logged user.
 *
 * @param req
 * @param res
 */
exports.getMe = function (req, res) {

  var query = "SELECT * FROM user WHERE `email` = ?";
  var value = [req.query.email];
  
  var getTheUser = db.query( query, value, function(err,rows) {
    console.log(rows);
    if (err) throw err;
    if (rows.length == 0) { return res.json(401); }
    else{
      var data = {userName: rows[0].name};
      res.send(data);
    }
  });
};

exports.deleteUser = function(req, res){

  var query = "DELETE * FROM user WHERE ? ";
  var value = {
    email: req.query.email
  }
  var deleteTheUser = db.query( query, value, function(err,rows) {
    if (err) throw err;
   
    res.send(rows);
  });

}
