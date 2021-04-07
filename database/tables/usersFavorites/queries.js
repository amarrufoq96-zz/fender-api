const mysql = require('../../mysql')();
const model = {};

model.getUserFavorites = username => mysql.query(`
SELECT character_id AS characterId
FROM user_favorites
WHERE user_id = ?;`, [username]);

module.exports = model;
