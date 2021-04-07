const jwt = require('jsonwebtoken');
const { messages, keys } = require.main.require('./configurations');
const { users } = require.main.require('./database');
const system = require('../../system');
const functions = {};

async function getAccount(user) {
    const { email } = user;
    const account = await users.getUserByEmail(email);

    if (account.length > 0) {
        const {
            id, name, lastName, comparePassword, active,
        } = account[0];

        user.id = id;
        user.name = name;
        user.lastName = lastName;
        user.comparePassword = comparePassword;
        user.active = active;

        return user;
    }

    return system.throwError(400, messages.loginError, { email });
}

async function getPermission(user) {
    const { active, email } = user;
    if (active === 1) return user;
    return system.throwError(400, messages.noPermission, { email });
}

async function verifyPassword(user) {
    const { email, password, comparePassword } = user;
    const hasVerified = await system.comparePassword(password, comparePassword);

    if (hasVerified) {
        delete user.password;
        delete user.comparePassword;
        return user;
    }

    return system.throwError(400, messages.loginError, { email });
}

functions.getUserAccount = (user) => getAccount(user);
functions.getUserPermission = (user) => getPermission(user);
functions.verifyPassword = (user) => verifyPassword(user);
functions.createToken = (user) => ({
    token: jwt.sign(user, keys.jwt, { expiresIn: '365' }),
});

module.exports = functions;
