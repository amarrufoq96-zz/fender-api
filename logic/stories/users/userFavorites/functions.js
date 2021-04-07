const { messages } = require.main.require('./configurations');
const { usersFavorites } = require.main.require('./database');
const system = require('../../system');
const functions = {};

async function newFavorite(parameters = {}) {
    const { id, idCharacter } = parameters;
    const body = {
        user_id: id,
        character_id: idCharacter,
        active: 1,
    };
    const insertUser = await usersFavorites.insert(body);

    return { success: 200, id: insertUser.insertId };
}

functions.createFavorite = async parameters => {
    const result = await newFavorite(parameters);
    if (!result) return system.throwError(400, messages.genericError);
    return { status: 200, result };
};

module.exports = functions;
