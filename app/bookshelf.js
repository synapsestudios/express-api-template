var dbConfig = {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING
};
var pg = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');

module.exports = bookshelf;
