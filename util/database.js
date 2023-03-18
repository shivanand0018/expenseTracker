const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'products',
    password: 'password@123'
});

module.exports = pool.promise();