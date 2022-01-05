const Shipper = require('./shippers-model')

module.exports = {
  checkId,
  checkPayload,
}

async function checkId(req, res, next) {
  try {
    const shipper = await Shipper.getById(req.params.shipperid)
    if (shipper) {
      req.shipper = shipper // req.shipper is used in [GET] api/shippers/:shipperid endpoint saving an extra trip to the db
      next()
    } else {
      next({ status: 404, message: 'Shipper not found' })
    }
  } catch (err) { next(err) }
}

function checkPayload(req, res, next) {
  const { shippername, phone } = req.body
  if (shippername && phone) {
    next()
  } else {
    next({ status: 404, message: 'shippername and phone are required' })
  }
}
