module.exports = (app) => {
	const blogController = require('../controller').blog

	var router = require('express').Router()

	// Create a new Blog
	router.post('/', blogController.create)

	// Retrieve all Blog
	router.get('/', blogController.findAll)

	// Retrieve a single Blog with id
	router.get('/:id', blogController.findOne)

	// Update a Blog with id
	router.put('/:id', blogController.update)

	// Delete a Blog with id
	router.delete('/:id', blogController.delete)

	// Delete all Blog
	router.delete('/', blogController.deleteAll)

	app.use('/api/blog', router)
}
