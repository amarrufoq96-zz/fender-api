const { messages } = require.main.require('./configurations');
const { users } = require.main.require('./database');
const system = require('../../system');
const functions = {};

async function newUser(parameters = {}) {
    const { username, name, password } = parameters;
    const body = {
        username,
        name,
        password,
        active: 1,
    };
    const insertUser = await users.insert(body);
    return { success: 200, id: insertUser.insertId };
}

functions.createUser = async parameters => {
    const result = await newUser(parameters);
    if (!result) return system.throwError(400, messages.genericError);
    return { status: 200, result };
};

module.exports = functions;
