const tables = require('./tables');
const mysql = require('./mysql');
const sql = require('./sql');

module.exports = {
    ...tables,
    mysql,
    sql,
};
