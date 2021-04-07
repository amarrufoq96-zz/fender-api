const functions = require('./functions');
const validation = require('./validation');
const system = require('../../system');

const saveFavoriteCharacter = (parameters) => system.startPromiseChain(parameters)
    .then(validation.validateParameters)
    .then(functions.createFavorite);

module.exports = { saveFavoriteCharacter };
