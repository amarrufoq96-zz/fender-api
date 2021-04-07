const mysql = require('../../mysql')();
const model = {};

model.getUserByEmail = email => mysql.query(`
    SELECT id, name, last_name as lastName, email, password AS comparePassword, active
    FROM users 
    WHERE email = ?;`, [email], { showQuery: true });

module.exports = model;
