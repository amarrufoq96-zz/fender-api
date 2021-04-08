const mysql = require('../../mysql')();
const model = {};

model.getUserFavorites = username => mysql.query(`
SELECT DISTINCT character_id AS characterId
FROM user_favorites
WHERE user_id = ? AND active = 1;`, [username]);

module.exports = model;
