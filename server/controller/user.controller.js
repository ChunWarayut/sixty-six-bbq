const User = require('../models').User
const User = require('../models').User
const Status = require('../models').Status
const master = require('../services/master.service')

module.exports = {
	async findAll(req, res) {
		try {
			const userCollection = await User.findAll({
				attributes: ['id', 'titleTH', 'titleEN', 'detailTH', 'detailEN'],
				where: { statusFlag: 'A' },
				include: [
					{
						model: User,
						attributes: ['username', 'firstname', 'lastname', 'status'],
						as: 'UserCreate',
						required: false,
						include: [
							{
								model: Status,
								attributes: ['name', 'level'],
								as: 'UserLevel',
								required: false
							}
						]
					},
					{
						model: User,
						attributes: ['username', 'firstname', 'lastname', 'status'],
						as: 'UserUpdate',
						required: false,
						include: [
							{
								model: Status,
								attributes: ['name', 'level'],
								as: 'UserLevel',
								required: false
							}
						]
					}
				]
			})

			if (userCollection) {
				res.status(201).send(userCollection)
			} else {
				res.status(404).send({ message: 'User Not Found' })
			}
		} catch (e) {
			res.status(500).send(e)
		}
	},

	async findOne(req, res) {
		try {
			const userCollection = await User.find({
				where: { id: req.params.id }
			})

			userCollection ? res.status(201).send(userCollection) : res.status(404).send({ message: 'User Not Found' })
		} catch (e) {
			res.status(500).send(e)
		}
	},

	async create(req, res) {
		const username = await req.body.username
		const userID = await master.getUserByUsername(username)
		if (
			!req.body.titleTH ||
			!req.body.titleEN ||
			!req.body.detailTH ||
			!req.body.detailEN ||
			!req.body.image ||
			!req.body.statusFlag ||
			!userID
		) {
			res.status(400).send({
				message: 'Content can not be empty!'
			})
			return
		}

		try {
			const user = await User.create({
				titleTH: req.body.titleTH,
				titleEN: req.body.titleEN,
				detailTH: req.body.detailTH,
				detailEN: req.body.detailEN,
				image: req.body.image,
				statusFlag: req.body.statusFlag,
				createdBy: userID.id,
				updatedBy: userID.id
			})
			res.status(201).send(user)
		} catch (err) {
			res.status(400).send({
				message: err.message || 'Some error occurred while creating the User.'
			})
		}
	},

	async update(req, res) {
		const id = req.params.id
		const username = await req.body.username
		const userID = await master.getUserByUsername(username)

		try {
			const userCollection = await User.update(
				{ ...req.body, updatedBy: userID.id },
				{
					where: { id }
				}
			)

			if (userCollection[0] === 1) {
				res.status(201).send({
					message: 'User was updated successfully.'
				})
			} else {
				res.status(404).send({
					message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
				})
			}
		} catch (e) {
			res.status(400).send({
				message: 'Error updating User with id=' + id,
				detail: e.message || 'Some error occurred while creating the User.'
			})
		}
	},

	async delete(req, res) {
		const id = req.params.id
		const username = await req.body.username
		const userID = await master.getUserByUsername(username)
		if (!userID) {
			res.status(400).send({
				message: 'Content can not be empty!'
			})
			return
		}
		try {
			const userCollection = await User.destroy({
				where: { id: id }
			})

			if (userCollection === 1) {
				await User.update(
					{ statusFlag: 'D', deletedBy: userID.id },
					{
						where: { id: id },
						paranoid: false
					}
				)
				res.status(201).send({
					message: 'User was deleted successfully.'
				})
			} else {
				res.status(404).send({
					message: `Cannot delete User with id=${id}. Maybe User was not found or req.body is empty!`
				})
			}
		} catch (e) {
			res.status(400).send({
				message: 'Error updating User with id=' + id,
				detail: e.message || 'Some error occurred while creating the User.'
			})
		}
	},
	async deleteAll(req, res) {
		const username = await req.body.username
		const userID = await master.getUserByUsername(username)
		if (!userID) {
			res.status(400).send({
				message: 'Content can not be empty!'
			})
			return
		}
		try {
			const userCollection = await User.destroy({ where: {} })

			if (userCollection) {
			}

			res.status(201).send({
				message: `${userCollection} Users were deleted successfully!`
			})
		} catch (err) {
			res.status(400).send({
				message: err.message || 'Some error occurred while removing all Users.'
			})
		}
	}
}
