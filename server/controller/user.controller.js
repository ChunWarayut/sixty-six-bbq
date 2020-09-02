const User = require('../models').User
const master = require('../services/master.service')

module.exports = {
	async login(req, res) {
		const username = req.body.username || null
		const password = req.body.password || null
		if (!username || !password) {
			res.status(201).send(false)
		}
		try {
			const userCollection = await User.find({
				where: { username }
			})
			const verifyPassword = await master.verifyPassword(password, userCollection.password)
			userCollection ? res.status(201).send(verifyPassword) : res.status(201).send(false)
		} catch (e) {
			res.status(201).send(false)
		}
	}
}
