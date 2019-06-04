const knex = require('knex');

const config = {
  client: 'sqlite3',
  connection: {
    filename: './data/posts.sqlite3'
  },
  useNullAsDefault: true
};

module.exports = knex(config);