const functions = require('./functions');
const validation = require('./validation');
const system = require('../../system');

const login = (parameters) => system.startPromiseChain(parameters)
    .then(validation.validateParameters)
    .then(functions.getUserAccount)
    .then(functions.getUserPermission)
    .then(functions.verifyPassword)
    .then(functions.createToken);

module.exports = { login };
