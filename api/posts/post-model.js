const db = require('../../data/db-config')

function get() {
  // 👉 SELECT * FROM posts;

  return db('posts')
}

function getById(id) {
  // 👉 SELECT * FROM posts WHERE id = 1;

  return db('posts').where('id', id).first()
  // 💡 we need first() otherwise we get an array
  // which by the way is always truthy even if it's empty
}

async function create({ title, contents }) {
  // 👉 INSERT INTO posts (title, contents) VALUES ('foo', 'bar');

  // With Postgres (Build Week) it will be easier to have the `insert` return the new post
  // With SQLite we need to make a second db call as the db responds with an array of new ids
  const [id] = await db('posts').insert({ title, contents })
  return getById(id)
}

// 💡 With [PUT] it is convention to "replace" the entire resource
// even if not fields have suffered changes
async function update(id, { title, contents }) { // We pass { title, contents } both
  // 👉 UPDATE posts SET title = 'foo', contents = 'bar' WHERE id = 1;

  // With Postgres (Build Week) it will be easier to have the `update` return the updated post
  // With SQLite we need to make a second db call as update responds with the number or rows inserted
  await db('posts').where('id', id).update({ title, contents })
  return getById(id)
}

async function remove(id) {
  // 👉 DELETE FROM posts WHERE id = 1;

  // With Postgres (Build Week) it will be easier to have the `remove` return the deleted post
  // With SQLite we need to make a second db call as remove responds with the number or rows removed
  const onTheChoppingBlock = await getById(id)
  await db('posts').where('id', id).delete()
  return onTheChoppingBlock
}

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
}
