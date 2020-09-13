const express = require('express')
const productController = require('../controllers/product.controller')

var router = express.Router()

router.get('/', productController.productList)
router.get('/:id', productController.productDetail)
router.post('/', productController.productStore)
router.put('/:id', productController.productUpdate)
router.delete('/:id', productController.productDelete)

module.exports = router
