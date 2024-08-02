const express = require('express')
const Shipper = require('./shippers-model')
const { checkId, checkPayload } = require('./shippers-middleware')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const shippers = await Shipper.get()
    res.json(shippers)
  } catch (err) { next(err) } // use next(err) to avoid repeating the same error logic
})

router.get('/:shipperid', checkId, async (req, res) => {
  // see how skinny the endpoint becomes thanks to middleware?
  res.status(200).json(req.shipper)
})

router.post('/', checkPayload, async (req, res, next) => {
  try {
    const newShipper = await Shipper.create(req.body) // req.body is sure to have the correct shape
    res.status(201).json(newShipper)
  } catch (err) { next(err) }
})

router.put('/:shipperid', checkPayload, checkId, async (req, res, next) => {
  try {
    const updatedShipper = await Shipper.update(req.params.shipperid, req.body) // id and body are verified to be good
    res.status(200).json(updatedShipper)
  } catch (err) { next(err) }
})

router.delete('/:shipperid', checkId, async (req, res, next) => {
  try {
    const deletedShipper = await Shipper.remove(req.params.shipperid)
    res.status(200).json(deletedShipper)
  } catch (err) { next(err) }
})

// THIS ERROR HANDLING MIDDLEWARE NEEDS TO COME AFTER THE ENDPOINTS
// AND IT NEEDS THE `next` PARAMETER EVEN IF IT'S NOT USED!!
router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router
