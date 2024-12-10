const mysql = require('mysql2');

// Membaca variabel dari .env
const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DB || 'Quiz',
});

module.exports = connection;
