module.exports = (app) => {
	const userController = require('../controller').user

	var router = require('express').Router()

	// Create a new User
	router.post('/login', userController.login)

	app.use('/api/user', router)
}
