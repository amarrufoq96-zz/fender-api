const { messages } = require.main.require('./configurations');
const { users } = require.main.require('./database');
const system = require('../../system');
const functions = {};

async function editUserInformation(parameters = {}) {
    const {
        username, name, password, active, id,
    } = parameters;
    const body = {
        id,
        username,
        name,
        password,
        active,
    };
    await users.update(body);
    return body;
}

functions.editUser = async parameters => {
    const result = await editUserInformation(parameters);
    if (!result) return system.throwError(400, messages.genericError);
    return { status: 200, result };
};

module.exports = functions;
