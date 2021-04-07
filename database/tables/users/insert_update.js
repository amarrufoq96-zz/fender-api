const mysql = require('../../mysql')();
const model = {};
const tableName = 'users';

model.insert = parameters => mysql.insert(tableName, parameters);

model.update = ({
    id,
    name,
}) => {
    const promises = [];

    if (name || name === 0) { promises.push(mysql.update(tableName, { name }, { id })); }

    return Promise.all(promises).then(result => result);
};

module.exports = model;
