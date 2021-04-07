const login = require('./login');
const createUser = require('./createUser');
const userFavorites = require('./userFavorites');
const userInformation = require('./userInformation');

module.exports = {
    ...login,
    ...createUser,
    ...userFavorites,
    ...userInformation,
};
