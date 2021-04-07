const insertUpdate = require('./insert_update');
const queries = require('./queries');

module.exports = {
    ...insertUpdate,
    ...queries,
};
