var mysql  = require('mysql');
var config = require('./environment');



var connection = mysql.createConnection({
  host     : 'localhost',
  user     : config.db_connection.user,
  password : config.db_connection.password,
  database : config.db_connection.database
});
 
connection.connect(function(err){
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  connection.query('SELECT * FROM potluck', function(err, rows, fields) {
    if (err) throw err;
   
    console.log('The potluck is: ', rows);
  });
  
});
 
module.exports = connection;

// var Sequelize = require('sequelize');
// var sequelize = new Sequelize(config.db_connection.database, config.db_connection.user, config.db_connection.password, {
//   host: 'localhost',
//   dialect: 'mysql',
//   //maximum connection and minimum connection
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   }
// });
