const mssql = require('mssql');
const sqlString = require('sqlstring');
const moment = require('moment-timezone');
const escapeString = require('sql-string-escape');
const { database } = require.main.require('./configurations');
const defaultConfig = database[process.env.NODE_ENV || 'development'];

const buildQuery = (query, params, options) => {
    const queryFormat = sqlString.format(query, params).replace(/`/g, '');
    const insertOption = 'SELECT SCOPE_IDENTITY() AS insertId';
    return options.insert
        ? `${queryFormat} ${insertOption}`
        : queryFormat;
};

function checkConfigParameter(config) {
    if (!config) throw new Error('No configuration; please provide a config for the DB connection');
    if (!config.server) throw new Error('No host in config; please provide a host name in the config object');
    if (!config.database) throw new Error('No database in config; please provide a database name in the config object');
}

const validateParameters = (query, params) => {
    if (!query || typeof query !== 'string') throw new Error('invalid param: query');
    if (!params || typeof params !== 'object') throw new Error('invalid param: query');
};

const processIgnoreOption = options => (options.ignoreInsert ? 'IGNORE' : '');

const getOnDuplicateValues = columnNames => (
    columnNames.reduce((accumulator, current) => accumulator + `${current} = VALUES(${current}), `, '')
);

const getConditionValues = (objectToInsert, conditions) => (
    Object.keys(conditions).map(value => ({
        [conditions[value]]: objectToInsert[conditions[value]],
    })).reduce((previousValue, currentValue) => ({ ...previousValue, ...currentValue }), {})
);

const getOnDuplicateStatement = columnNames => (
    `ON DUPLICATE KEY UPDATE ${getOnDuplicateValues(columnNames)}`.slice(0, -2)
);

const getSingleOnDuplicateStatement = columnNames => (
    `${getOnDuplicateValues(columnNames)}`.slice(0, -2)
);

const getColumnList = columnNames => (
    columnNames.reduce((accumulator, currentValue) => accumulator + currentValue + ' , ', ' ').slice(0, -2)
);

const logQuery = (query, params, type) => {
    /* eslint-disable no-console */
    console.log('');
    console.log(`-- ${!type ? '' : type} Query --------------------------------------------------`);
    console.log(query); console.log(params);
    console.log('-----------------------------------------------------------');
    console.log('');
    /* eslint-enable no-console */
};

module.exports = (config = defaultConfig) => {
    checkConfigParameter(config);
    config.options = {
        encrypt: false,
        enableArithAbort: true,
    };
    const shouldLog = options => (options.showQuery || config.showQueries);

    const cleanObject = (objectToInsert, conditions) => {
        const conditionsAndDate = [...conditions, 'fecha_registro'];
        const newObject = {};
        Object.keys(objectToInsert).forEach(values => {
            const match = conditionsAndDate.some(condition => condition === values);
            if (!match) {
                newObject[values] = objectToInsert[values];
            }
        });
        return newObject;
    };

    async function doQuery(query, parameters, options) {
        const pool = new mssql.ConnectionPool(config);
        validateParameters(query, parameters);
        const queryToDo = buildQuery(query, parameters, options);
        try {
            const connection = await pool.connect();
            if (shouldLog(options)) logQuery(query, parameters, options.queryType);
            const { recordset, rowsAffected } = await connection.request().query(queryToDo);
            return recordset || rowsAffected[0];
        } catch (error) {
            throw new Error('invalid: DATABASE_ERROR');
        } finally {
            pool.close();
        }
    }

    function escapeStringValues(value, needSingleQuotes) {
        if (typeof value === 'string' && needSingleQuotes) {
            return `'${escapeString(value).slice(1, -1)}'`;
        }
        if (typeof value === 'string') {
            return escapeString(value).slice(1, -1);
        }
        return value;
    }

    const getUpdateConditionStatement = conditions => (
        Object.keys(conditions).reduce((accumulator, current) => {
            accumulator += `${current} = ${escapeStringValues(conditions[current], true)} AND `;
            return accumulator;
        }, '').slice(0, -4)
    );

    function getObjectValues(object) {
        return Object.keys(object).map(key => {
            if (object[key] === true || object[key] === false) {
                return object[key].toString();
            }
            return object[key];
        });
    }

    const doInsert = (tableName, objectsToInsert, options) => {
        const normalizedObjectToInsert = !Array.isArray(objectsToInsert) ? [objectsToInsert] : objectsToInsert;
        options.queryType = 'Bulk Insert';
        const ignore = processIgnoreOption(options);
        const columnNames = Object.keys(normalizedObjectToInsert[0]);
        const values = [normalizedObjectToInsert.map(getObjectValues)];
        const onDuplicateStatement = options.upsert ? getOnDuplicateStatement(normalizedObjectToInsert) : '';
        const insertQuery = `INSERT ${ignore} INTO ${tableName}(${columnNames}) VALUES ? ${onDuplicateStatement} ;`;
        return doQuery(insertQuery, values, options);
    };

    const doSingleInsert = (tableName, objectsToInsert, options) => {
        const normalizedObjectToInsert = !Array.isArray(objectsToInsert) ? [objectsToInsert] : objectsToInsert;
        options.queryType = 'Bulk Insert';
        const ignore = processIgnoreOption(options);
        const columnNames = Object.keys(normalizedObjectToInsert[0]);
        const values = [normalizedObjectToInsert.map(getObjectValues)];
        const onDuplicateStatement = options.upsert ? getSingleOnDuplicateStatement(normalizedObjectToInsert) : '';
        const insertQuery = `INSERT ${ignore} INTO ${tableName}(${columnNames}) VALUES ? ${onDuplicateStatement} ;`;
        return doQuery(insertQuery, values, options);
    };

    const doUpdate = (tableName, dataToUpdate, conditions, options) => {
        options.queryType = 'Update';
        const conditionStatement = getUpdateConditionStatement(conditions);
        const setValues = Array.isArray(dataToUpdate) ? [dataToUpdate] : dataToUpdate;
        const whereStatement = conditionStatement !== '' ? `WHERE ${conditionStatement}` : '';
        const updateQuery = `UPDATE ${tableName} SET ? ${whereStatement};`;
        return doQuery(updateQuery, setValues, options);
    };

    return {
        query: (query = 'SELECT 1;', params = [], options = { showQuery: false }) => {
            const escapeValues = params.map(param => escapeStringValues(param, false));
            return doQuery(query, escapeValues, options);
        },
        select: (tableName = '', columnNames = ['*'], conditions = {}, options = { showQuery: false }) => {
            options.queryType = 'SELECT';
            const columnsList = getColumnList(columnNames);
            const conditionStatement = getUpdateConditionStatement(conditions);
            const whereStatement = conditionStatement !== '' ? `WHERE ${conditionStatement}` : '';
            const query = `SELECT ${columnsList} FROM ${tableName} ${whereStatement};`;
            return doQuery(query, [], options);
        },
        insert: (tableName = '', objectToInsert = {}, options = { showQuery: false, ignoreInsert: false }) => {
            const alteredOptions = { ...options, upsert: false, insert: true };
            return doInsert(tableName, objectToInsert, alteredOptions);
        },
        upsert: async (tableName = '', objectToInsert = {}, conditions = [''], options = { showQuery: false }) => {
            const alteredOptions = { ...options, upsert: false };
            const conditionValues = getConditionValues(objectToInsert, conditions);
            const dataToUpdate = cleanObject(objectToInsert, conditions);
            async function existsData() {
                const conditionStatement = getUpdateConditionStatement(conditionValues);
                const whereStatement = conditionStatement !== '' ? `WHERE ${conditionStatement}` : '';
                const columnsList = getColumnList(conditions);
                options.queryType = 'SELECT';
                return doQuery(`SELECT ${columnsList} FROM ${tableName} ${whereStatement};`, [], options)
                    .then(result => result.length > 0);
            }
            return await existsData()
                ? doUpdate(tableName, dataToUpdate, conditionValues, options)
                : doSingleInsert(tableName, objectToInsert, alteredOptions);
        },
        update: (tableName = '', dataToUpdate = {}, conditions = {}, options = { showQuery: false }) => (
            doUpdate(tableName, dataToUpdate, conditions, options)
        ),
        delete: (tableName = '', conditions = {}, options = { showQuery: false }) => {
            options.queryType = 'Delete';
            const conditionStatement = getUpdateConditionStatement(conditions);
            const whereStatement = conditionStatement !== '' ? `WHERE ${conditionStatement}` : '';
            return doQuery(`DELETE FROM ${tableName} ${whereStatement} ;`, [], options);
        },
        ifExists: (query = 'SELECT 1;', params = [], options = { showQuery: false }) => (
            doQuery(query, params, options).then(result => result.length > 0)
        ),
        nowUTC: () => moment.utc().format('YYYY-MM-DD HH:mm:ss'),
        now: (date = '', timezone = '', format = '') => {
            if (format === '') format = 'YYYY-MM-DD HH:mm:ss';
            if (timezone === '') timezone = 'America/Mexico_City';
            if (date === '') return moment().tz(timezone).format(format);
            return moment.tz(date, format, true, timezone).format(format);
        },
        timestamp: (timezone = '') => {
            const format = 'X';
            if (timezone === '') return moment().format(format);
            return moment().tz(timezone).format(format);
        },
        ifExistWithDetails: (query = 'SELECT 1;', params = [], options = { showQuery: false }) => (
            doQuery(query, params, options).then(result => {
                if (result.length > 0) return result;
                return false;
            })
        ),
    };
};
