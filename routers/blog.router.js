const express = require('express')
const blogController = require('../controllers/blog.controller')

var router = express.Router()

router.get('/', blogController.blogList)
router.get('/:id', blogController.blogDetail)
router.post('/', blogController.blogStore)
router.put('/:id', blogController.blogUpdate)
router.delete('/:id', blogController.blogDelete)

module.exports = router
