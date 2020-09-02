const Image = require('../models').Image
const User = require('../models').User
const Status = require('../models').Status
const master = require('../services/master.service')

module.exports = {
	async findAll(req, res) {
		try {
			const imageCollection = await Image.findAll({
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

			if (imageCollection) {
				res.status(201).send(imageCollection)
			} else {
				res.status(404).send({ message: 'Image Not Found' })
			}
		} catch (e) {
			res.status(500).send(e)
		}
	},

	async findOne(req, res) {
		try {
			const imageCollection = await Image.find({
				where: { id: req.params.id }
			})

			imageCollection ? res.status(201).send(imageCollection) : res.status(404).send({ message: 'Image Not Found' })
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
			const image = await Image.create({
				titleTH: req.body.titleTH,
				titleEN: req.body.titleEN,
				detailTH: req.body.detailTH,
				detailEN: req.body.detailEN,
				image: req.body.image,
				statusFlag: req.body.statusFlag,
				createdBy: userID.id,
				updatedBy: userID.id
			})
			res.status(201).send(image)
		} catch (err) {
			res.status(400).send({
				message: err.message || 'Some error occurred while creating the Image.'
			})
		}
	},

	async update(req, res) {
		const id = req.params.id
		const username = await req.body.username
		const userID = await master.getUserByUsername(username)

		try {
			const imageCollection = await Image.update(
				{ ...req.body, updatedBy: userID.id },
				{
					where: { id }
				}
			)

			if (imageCollection[0] === 1) {
				res.status(201).send({
					message: 'Image was updated successfully.'
				})
			} else {
				res.status(404).send({
					message: `Cannot update Image with id=${id}. Maybe Image was not found or req.body is empty!`
				})
			}
		} catch (e) {
			res.status(400).send({
				message: 'Error updating Image with id=' + id,
				detail: e.message || 'Some error occurred while creating the Image.'
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
			const imageCollection = await Image.destroy({
				where: { id: id }
			})

			if (imageCollection === 1) {
				await Image.update(
					{ statusFlag: 'D', deletedBy: userID.id },
					{
						where: { id: id },
						paranoid: false
					}
				)
				res.status(201).send({
					message: 'Image was deleted successfully.'
				})
			} else {
				res.status(404).send({
					message: `Cannot delete Image with id=${id}. Maybe Image was not found or req.body is empty!`
				})
			}
		} catch (e) {
			res.status(400).send({
				message: 'Error updating Image with id=' + id,
				detail: e.message || 'Some error occurred while creating the Image.'
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
			const imageCollection = await Image.destroy({ where: {} })

			if (imageCollection) {
			}

			res.status(201).send({
				message: `${imageCollection} Images were deleted successfully!`
			})
		} catch (err) {
			res.status(400).send({
				message: err.message || 'Some error occurred while removing all Images.'
			})
		}
	}
}
