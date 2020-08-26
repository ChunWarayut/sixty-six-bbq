module.exports = (app) => {
	const aboutController = require('../controller').about

	var router = require('express').Router()

	// Create a new About
	router.post('/', aboutController.create)

	// Retrieve all About
	router.get('/', aboutController.findAll)

	// Retrieve a single About with id
	router.get('/:id', aboutController.findOne)

	// Update a About with id
	router.put('/:id', aboutController.update)

	// Delete a About with id
	router.delete('/:id', aboutController.delete)

	// Delete all About
	router.delete('/', aboutController.deleteAll)

	app.use('/api/about', router)
}
