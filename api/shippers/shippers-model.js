const db = require('../../data/db-config')

function get() {
  // 👉 SELECT * FROM shippers;

  return db('shippers')
}

function getById(shipperid) {
  // 👉 SELECT * FROM shippers WHERE shipperid = 1;

  return db('shippers').where('shipperid', shipperid).first()
  // 💡 we need first() otherwise we get an array
  // which by the way is always truthy even if it's empty
}

async function create({ shippername, phone }) {
  // 👉 INSERT INTO shippers (shippername, phone) VALUES ('ACME', '(321) 123-1234');

  // With Postgres (Build Week) it will be easier to have the `insert` return the new shipper
  // With SQLite we need to make a second db call as the db responds with an array of new ids
  const [shipperid] = await db('shippers').insert({ shippername, phone })
  return getById(shipperid)
}

// 💡 With [PUT] it is convention to "replace" the entire resource
// even if not fields have suffered changes
async function update(shipperid, { shippername, phone }) { // We pass { shippername, phone } both
  // 👉 UPDATE shippers SET shippername = 'ACME', phone = '(321) 123-1234' WHERE shipperid = 1;

  // With Postgres (Build Week) it will be easier to have the `update` return the updated shipper
  // With SQLite we need to make a second db call as update responds with the number or rows inserted
  await db('shippers').where('shipperid', shipperid).update({ shippername, phone })
  return getById(shipperid)
}

async function remove(shipperid) {
  // 👉 DELETE FROM shippers WHERE shipperid = 1;

  // With Postgres (Build Week) it will be easier to have the `remove` return the deleted shipper
  // With SQLite we need to make a second db call as remove responds with the number or rows removed
  const onTheChoppingBlock = await getById(shipperid)
  await db('shippers').where('shipperid', shipperid).delete()
  return onTheChoppingBlock
}

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
}
