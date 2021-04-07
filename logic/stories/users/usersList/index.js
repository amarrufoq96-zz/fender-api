const functions = require('./functions');
const system = require('../../system');

const usersList = (parameters) => system.startPromiseChain(parameters)
    .then(functions.usersList);

module.exports = { usersList };
