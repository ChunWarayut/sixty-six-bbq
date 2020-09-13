const express = require('express')
const aboutController = require('../controllers/about.controller')

var router = express.Router()

router.get('/', aboutController.aboutList)
router.get('/:id', aboutController.aboutDetail)
router.post('/', aboutController.aboutStore)
router.put('/:id', aboutController.aboutUpdate)
router.delete('/:id', aboutController.aboutDelete)

module.exports = router
