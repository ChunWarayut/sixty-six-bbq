module.exports = (app) => {
	app.get('/api', (req, res) => {
		res.status(200).send({
			data: 'Welcome Node Sequelize API.'
		})
	})

	require('./about')(app)
	require('./user')(app)
}
