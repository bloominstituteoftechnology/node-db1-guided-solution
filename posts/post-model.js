const db = require('../data/db-setup.js');

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
  return db('posts').where({ id });
}

function add(post) {
  return db('posts').insert(post);
}

function update(id, changes) {
  return db('posts').where({ id }).update(changes);
}

function remove(id) {
  return db('posts').where({ id }).del();
}