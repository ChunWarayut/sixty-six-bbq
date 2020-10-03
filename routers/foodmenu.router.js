const express = require('express')
const foodmenuController = require('../controllers/foodmenu.controller')

var router = express.Router()

router.get('/', foodmenuController.foodmenuList)
router.get('/:id', foodmenuController.foodmenuDetail)
router.post('/', foodmenuController.foodmenuStore)
router.put('/:id', foodmenuController.foodmenuUpdate)
router.delete('/:id', foodmenuController.foodmenuDelete)

module.exports = router
