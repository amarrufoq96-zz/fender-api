const mysql = require('../../mysql')();
const model = {};
const tableName = 'user';

model.insert = parameters => mysql.insert(tableName, parameters);

model.update = ({
    id,
    name,
    username,
    active,
}) => {
    const promises = [];

    if (name || name === 0) { promises.push(mysql.update(tableName, { name }, { id })); }
    if (username || username === 0) { promises.push(mysql.update(tableName, { username }, { id })); }
    if (active || active === 0) { promises.push(mysql.update(tableName, { active }, { id })); }

    return Promise.all(promises).then(result => result);
};

module.exports = model;
