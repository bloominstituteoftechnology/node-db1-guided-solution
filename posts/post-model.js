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
  // we can use first() to get back a single post
  return db('posts').where({ id }).first();
}

async function add(post) {
  // insert resolves to an array of ids
  // we can use our findById helper to return the full post
  const [ id ] = await db('posts').insert(post);
  return findById(id);
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