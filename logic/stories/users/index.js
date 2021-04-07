const login = require('./login');
const createUser = require('./createUser');
const userFavorites = require('./userFavorites');
const userInformation = require('./userInformation');
const usersList = require('./usersList');
const editUser = require('./editUser');

module.exports = {
    ...login,
    ...createUser,
    ...userFavorites,
    ...userInformation,
    ...usersList,
    ...editUser,
};
