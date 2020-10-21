const express = require('express')
const referencevalueController = require('../controllers/referencevalue.controller')

var router = express.Router()

router.get('/', referencevalueController.referencevalueList)
router.get('/:id', referencevalueController.referencevalueDetail)
router.post('/', referencevalueController.referencevalueStore)
router.put('/:id', referencevalueController.referencevalueUpdate)
router.delete('/:id', referencevalueController.referencevalueDelete)

module.exports = router
