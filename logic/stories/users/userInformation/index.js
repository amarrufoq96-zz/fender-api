const functions = require('./functions');
const validation = require('./validation');
const system = require('../../system');

const userInformation = (parameters) => system.startPromiseChain(parameters)
    .then(validation.validateParameters)
    .then(functions.userInformation)
    .then(functions.userFavorites);

module.exports = { userInformation };
