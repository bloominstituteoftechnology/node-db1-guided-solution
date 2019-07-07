const db = require('../data/db-config.js');

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};

function find() {
  return db('posts');
}

function findById(id) {
  // resolves to a single post in an array
  return db('posts').where({ id });
}

function add(post) {
  // insert resolves to an array of ids
  // additional code needed to send back the full post
  return db('posts').insert(post);
}

function update(id, changes) {
  // update resolves to a count of rows updated
  // additional code would be needed to send back the updated post
  return db('posts').where({ id }).update(changes);
}

function remove(id) {
  // del/delete resolves to a count of rows removed
  // additional code would be needed to send back the removed post
  return db('posts').where({ id }).del();
}