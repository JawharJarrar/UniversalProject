/**
 * mysql database configuration
 */
const mysql = require('mysql');
    const db = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'jarrar',
        database: 'demo',
    });
    export default db;
