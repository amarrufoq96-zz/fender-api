const mysql = require('../../mysql')();
const model = {};

model.getUserByEmail = username => mysql.query(`
    SELECT id, username, password AS comparePassword, active
    FROM user
    WHERE username = ?;`, [username]);

model.getUserInformation = username => mysql.query(`
SELECT u.id, u.username, u.name, u.password
FROM user as u
WHERE u.id = ? and u.active = 1;`, [username]);

model.getUsersList = username => mysql.query(`
SELECT u.id, u.username, u.name, u.password
FROM user as u
WHERE u.active = 1;`, [username]);

module.exports = model;
