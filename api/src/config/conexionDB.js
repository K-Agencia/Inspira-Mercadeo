const mysql = require('mysql');
const dotenv = require('dotenv').config();

const mysqlConnection = mysql.createPool({
   connectionLimit: 20,
   host: process.env.DDBB_HOST,
   user: process.env.DDBB_USER,
   password: process.env.DDBB_PASSWORD,
   database: "kagencia_reconocimientos",
});

module.exports = mysqlConnection;