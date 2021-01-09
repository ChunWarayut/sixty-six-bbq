const express = require('express')
const checkinController = require('../controllers/checkin.controller')

var router = express.Router()
router.get('/history', checkinController.checkinHistory)
router.get('/', checkinController.checkinList)
router.get('/:id', checkinController.checkinDetail)
router.post('/', checkinController.checkinStore)
router.post('/check', checkinController.checkinCheck)

module.exports = router
