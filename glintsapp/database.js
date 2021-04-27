var mysql = require('mysql');

var mysqlPool = mysql.createPool({
    host     : 'us-cdbr-east-03.cleardb.com',
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB
});

module.exports = mysqlPool;