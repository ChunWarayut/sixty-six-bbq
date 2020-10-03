const express = require('express')
const statusController = require('../controllers/status.controller')

var router = express.Router()

router.get('/', statusController.statusList)
router.get('/:id', statusController.statusDetail)
router.post('/', statusController.statusStore)
router.put('/:id', statusController.statusUpdate)
router.delete('/:id', statusController.statusDelete)

module.exports = router
