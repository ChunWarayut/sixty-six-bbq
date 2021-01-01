const express = require('express')
const checkinController = require('../controllers/checkin.controller')

var router = express.Router()

router.get('/', checkinController.checkinList)
router.get('/:id', checkinController.checkinDetail)
router.post('/', checkinController.checkinStore)

module.exports = router
