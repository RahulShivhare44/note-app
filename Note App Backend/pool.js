const mysql = require('mysql')

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    password: '123',
    user: 'root',
    database: 'noteapp',
    connectionLimit: 100,
})

module.exports = pool