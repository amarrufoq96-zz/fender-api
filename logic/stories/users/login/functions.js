const jwt = require('jsonwebtoken');
const { messages, keys } = require.main.require('./configurations');
const { users } = require.main.require('./database');
const system = require('../../system');
const functions = {};

async function getAccount(user) {
    const { username } = user;
    const account = await users.getUserByEmail(username);

    if (account.length > 0) {
        const {
            id, username, comparePassword, active,
        } = account[0];

        user.id = id;
        user.username = username;
        user.comparePassword = comparePassword;
        user.active = active;

        return user;
    }

    return system.throwError(400, messages.loginError, { username });
}

async function getPermission(user) {
    const { active, username } = user;
    if (active === 1) {
        return user;
    }
    return system.throwError(400, messages.noPermission, { username });
}

async function verifyPassword(user) {
    const { username, password, comparePassword } = user;
    if (password === comparePassword) {
        delete user.password;
        delete user.comparePassword;
        return user;
    }

    return system.throwError(400, messages.loginError, { username });
}

functions.getUserAccount = (user) => getAccount(user);
functions.getUserPermission = (user) => getPermission(user);
functions.verifyPassword = (user) => verifyPassword(user);
functions.createToken = (user) => ({
    success: 200, token: jwt.sign(user, keys.jwt, { expiresIn: '365' }),
});

module.exports = functions;
