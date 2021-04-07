const { messages } = require.main.require('./configurations');
const { users } = require.main.require('./database');
const system = require('../../system');
const functions = {};

async function getUsersList() {
    const getUsers = await users.getUsersList();
    if (getUsers.length > 0) {
        return getUsers;
    }
    return system.throwError(400, messages.loginError);
}

functions.usersList = async parameters => {
    const result = await getUsersList(parameters);
    if (!result) return system.throwError(400, messages.genericError);
    return { success: 200, users: result };
};

module.exports = functions;
