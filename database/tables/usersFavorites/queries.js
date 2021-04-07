const mysql = require('../../mysql')();
const model = {};

model.getUserByEmail = username => mysql.query(`
    SELECT id, username, password AS comparePassword, active
    FROM user
    WHERE username = ?;`, [username]);

module.exports = model;
