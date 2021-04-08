const axios = require('axios');
const { messages } = require.main.require('./configurations');
const { users, usersFavorites } = require.main.require('./database');
const system = require('../../system');
const functions = {};

async function getuserInformation(parameters = {}) {
    const { id } = parameters;
    const getInformtaion = await users.getUserInformation(id);
    if (getInformtaion.length > 0) {
        const {
            id, username, name,
        } = getInformtaion[0];

        const userData = [];
        userData.id = id;
        userData.username = username;
        userData.name = name;

        return userData;
    }

    return system.throwError(400, messages.loginError, { id });
}

async function getuserFavorites(userData = []) {
    const getFavorites = await usersFavorites.getUserFavorites(userData.id);
    const { id, username, name } = userData;
    if (getFavorites) {
        const favoritesArray = [];
        getFavorites.map(items => {
            favoritesArray.push(items.characterId);
        });
        const favorites = await axios.get(`https://rickandmortyapi.com/api/character/${favoritesArray}`);
        const fav = favorites.data;
        return {
            id, username, name, fav,
        };
    }

    return system.throwError(400, messages.loginError);
}

functions.userFavorites = async parameters => {
    const data = await getuserFavorites(parameters);
    if (!data) return system.throwError(400, messages.genericError);
    return { status: 200, data };
};

functions.userInformation = async parameters => {
    const result = await getuserInformation(parameters);
    if (!result) return system.throwError(400, messages.genericError);
    return result;
};

module.exports = functions;
