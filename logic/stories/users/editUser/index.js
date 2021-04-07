const functions = require('./functions');
const validation = require('./validation');
const system = require('../../system');

const editUser = (parameters) => system.startPromiseChain(parameters)
    .then(validation.validateParameters)
    .then(functions.editUser);

module.exports = { editUser };
