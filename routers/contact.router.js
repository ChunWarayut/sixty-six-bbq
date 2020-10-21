const express = require('express')
const contactController = require('../controllers/contact.controller')

var router = express.Router()

router.get('/', contactController.contactList)
router.get('/:id', contactController.contactDetail)
router.post('/', contactController.contactStore)
router.put('/:id', contactController.contactUpdate)
router.delete('/:id', contactController.contactDelete)

module.exports = router
