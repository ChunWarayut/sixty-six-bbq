const express = require('express')
const userController = require('../controllers/user.controller')

var router = express.Router()

router.get('/', userController.userList)
router.get('/:id', userController.userDetail)
router.post('/', userController.userStore)
router.put('/:id', userController.userUpdate)
router.delete('/:id', userController.userDelete)

module.exports = router
