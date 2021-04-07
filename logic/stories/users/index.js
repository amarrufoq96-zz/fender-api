const login = require('./login');
const createUser = require('./createUser');
const userFavorites = require('./userFavorites');

module.exports = {
    ...login,
    ...createUser,
    ...userFavorites,
};
