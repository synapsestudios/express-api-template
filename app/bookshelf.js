var dbConfig = {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING
};
var pg = require('knex')(dbConfig);
module.exports = require('bookshelf')(knex);
