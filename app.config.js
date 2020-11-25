/**
 * App config module.
 * @file 应用运行配置
 * @module app.config
 */
const {argv} = require('yargs');
exports.MONGODB = {
    uri: `mongodb://127.0.0.1:${argv.dbport || '27017'}/blogAdmin`,
    username: argv.db_username || 'DB_username',
    password: argv.db_password || 'DB_password',
};
