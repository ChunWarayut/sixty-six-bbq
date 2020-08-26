const About = require('../models').About
const User = require('../models').User
const Status = require('../models').Status
const master = require('../services/master.service')

module.exports = {
	async findAll(req, res) {
		try {
			const aboutCollection = await About.findAll({
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

			if (aboutCollection) {
				res.status(201).send(aboutCollection)
			} else {
				res.status(404).send({ message: 'About Not Found' })
			}
		} catch (e) {
			res.status(500).send(e)
		}
	},

	async findOne(req, res) {
		try {
			const aboutCollection = await About.find({
				where: { id: req.params.id }
			})

			aboutCollection ? res.status(201).send(aboutCollection) : res.status(404).send({ message: 'About Not Found' })
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
			const about = await About.create({
				titleTH: req.body.titleTH,
				titleEN: req.body.titleEN,
				detailTH: req.body.detailTH,
				detailEN: req.body.detailEN,
				image: req.body.image,
				statusFlag: req.body.statusFlag,
				createdBy: userID.id,
				updatedBy: userID.id
			})
			res.status(201).send(about)
		} catch (err) {
			res.status(400).send({
				message: err.message || 'Some error occurred while creating the About.'
			})
		}
	},

	async update(req, res) {
		const id = req.params.id
		const username = await req.body.username
		const userID = await master.getUserByUsername(username)

		try {
			const aboutCollection = await About.update(
				{ ...req.body, updatedBy: userID.id },
				{
					where: { id }
				}
			)

			if (aboutCollection[0] === 1) {
				res.status(201).send({
					message: 'About was updated successfully.'
				})
			} else {
				res.status(404).send({
					message: `Cannot update About with id=${id}. Maybe About was not found or req.body is empty!`
				})
			}
		} catch (e) {
			res.status(400).send({
				message: 'Error updating About with id=' + id,
				detail: e.message || 'Some error occurred while creating the About.'
			})
		}
	},

	async delete(req, res) {
		const id = req.params.id
		const username = await req.body.username
		const userID = await master.getUserByUsername(username)

		try {
			const aboutCollection = await About.destroy({
				where: { id: id }
			})

			if (aboutCollection === 1) {
				await About.update(
					{ statusFlag: 'D', deletedBy: userID.id },
					{
						where: { id: id },
						paranoid: false
					}
				)
				res.status(201).send({
					message: 'About was deleted successfully.'
				})
			} else {
				res.status(404).send({
					message: `Cannot delete About with id=${id}. Maybe About was not found or req.body is empty!`
				})
			}
		} catch (e) {
			res.status(400).send({
				message: 'Error updating About with id=' + id,
				detail: e.message || 'Some error occurred while creating the About.'
			})
		}
	},
	async deleteAll(req, res) {
		const username = await req.body.username
		const userID = await master.getUserByUsername(username)
		try {
			const aboutCollection = await About.destroy({ where: {} })

			if (aboutCollection) {
			}

			res.status(201).send({
				message: `${aboutCollection} Abouts were deleted successfully!`
			})
		} catch (err) {
			res.status(400).send({
				message: err.message || 'Some error occurred while removing all Abouts.'
			})
		}
	}
}
