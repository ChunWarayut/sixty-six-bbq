const Foodmenu = require('../models').Foodmenu
const User = require('../models').User
const Status = require('../models').Status
const master = require('../services/master.service')

module.exports = {
	async findAll(req, res) {
		try {
			const foodmenuCollection = await Foodmenu.findAll({
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

			if (foodmenuCollection) {
				res.status(201).send(foodmenuCollection)
			} else {
				res.status(404).send({ message: 'Foodmenu Not Found' })
			}
		} catch (e) {
			res.status(500).send(e)
		}
	},

	async findOne(req, res) {
		try {
			const foodmenuCollection = await Foodmenu.find({
				where: { id: req.params.id }
			})

			foodmenuCollection
				? res.status(201).send(foodmenuCollection)
				: res.status(404).send({ message: 'Foodmenu Not Found' })
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
			const foodmenu = await Foodmenu.create({
				titleTH: req.body.titleTH,
				titleEN: req.body.titleEN,
				detailTH: req.body.detailTH,
				detailEN: req.body.detailEN,
				image: req.body.image,
				statusFlag: req.body.statusFlag,
				createdBy: userID.id,
				updatedBy: userID.id
			})
			res.status(201).send(foodmenu)
		} catch (err) {
			res.status(400).send({
				message: err.message || 'Some error occurred while creating the Foodmenu.'
			})
		}
	},

	async update(req, res) {
		const id = req.params.id
		const username = await req.body.username
		const userID = await master.getUserByUsername(username)

		try {
			const foodmenuCollection = await Foodmenu.update(
				{ ...req.body, updatedBy: userID.id },
				{
					where: { id }
				}
			)

			if (foodmenuCollection[0] === 1) {
				res.status(201).send({
					message: 'Foodmenu was updated successfully.'
				})
			} else {
				res.status(404).send({
					message: `Cannot update Foodmenu with id=${id}. Maybe Foodmenu was not found or req.body is empty!`
				})
			}
		} catch (e) {
			res.status(400).send({
				message: 'Error updating Foodmenu with id=' + id,
				detail: e.message || 'Some error occurred while creating the Foodmenu.'
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
			const foodmenuCollection = await Foodmenu.destroy({
				where: { id: id }
			})

			if (foodmenuCollection === 1) {
				await Foodmenu.update(
					{ statusFlag: 'D', deletedBy: userID.id },
					{
						where: { id: id },
						paranoid: false
					}
				)
				res.status(201).send({
					message: 'Foodmenu was deleted successfully.'
				})
			} else {
				res.status(404).send({
					message: `Cannot delete Foodmenu with id=${id}. Maybe Foodmenu was not found or req.body is empty!`
				})
			}
		} catch (e) {
			res.status(400).send({
				message: 'Error updating Foodmenu with id=' + id,
				detail: e.message || 'Some error occurred while creating the Foodmenu.'
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
			const foodmenuCollection = await Foodmenu.destroy({ where: {} })

			if (foodmenuCollection) {
			}

			res.status(201).send({
				message: `${foodmenuCollection} Foodmenus were deleted successfully!`
			})
		} catch (err) {
			res.status(400).send({
				message: err.message || 'Some error occurred while removing all Foodmenus.'
			})
		}
	}
}
