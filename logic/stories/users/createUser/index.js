const functions = require('./functions');
const validation = require('./validation');
const system = require('../../system');

const createUser = (parameters) => system.startPromiseChain(parameters)
    .then(validation.validateParameters)
    .then(functions.createUser);

module.exports = { createUser };
