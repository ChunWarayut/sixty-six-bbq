const express = require('express')
const imageController = require('../controllers/image.controller')

var router = express.Router()

router.get('/', imageController.imageList)
router.get('/:id', imageController.imageDetail)
router.post('/', imageController.imageStore)
router.put('/:id', imageController.imageUpdate)
router.delete('/:id', imageController.imageDelete)

module.exports = router
