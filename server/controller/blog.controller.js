const Blog = require('../models').Blog
const User = require('../models').User
const Status = require('../models').Status
const master = require('../services/master.service')

module.exports = {
	async findAll(req, res) {
		try {
			const blogCollection = await Blog.findAll({
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

			if (blogCollection) {
				res.status(201).send(blogCollection)
			} else {
				res.status(404).send({ message: 'Blog Not Found' })
			}
		} catch (e) {
			res.status(500).send(e)
		}
	},

	async findOne(req, res) {
		try {
			const blogCollection = await Blog.find({
				where: { id: req.params.id }
			})

			blogCollection ? res.status(201).send(blogCollection) : res.status(404).send({ message: 'Blog Not Found' })
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
			const blog = await Blog.create({
				titleTH: req.body.titleTH,
				titleEN: req.body.titleEN,
				detailTH: req.body.detailTH,
				detailEN: req.body.detailEN,
				image: req.body.image,
				statusFlag: req.body.statusFlag,
				createdBy: userID.id,
				updatedBy: userID.id
			})
			res.status(201).send(blog)
		} catch (err) {
			res.status(400).send({
				message: err.message || 'Some error occurred while creating the Blog.'
			})
		}
	},

	async update(req, res) {
		const id = req.params.id
		const username = await req.body.username
		const userID = await master.getUserByUsername(username)

		try {
			const blogCollection = await Blog.update(
				{ ...req.body, updatedBy: userID.id },
				{
					where: { id }
				}
			)

			if (blogCollection[0] === 1) {
				res.status(201).send({
					message: 'Blog was updated successfully.'
				})
			} else {
				res.status(404).send({
					message: `Cannot update Blog with id=${id}. Maybe Blog was not found or req.body is empty!`
				})
			}
		} catch (e) {
			res.status(400).send({
				message: 'Error updating Blog with id=' + id,
				detail: e.message || 'Some error occurred while creating the Blog.'
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
			const blogCollection = await Blog.destroy({
				where: { id: id }
			})

			if (blogCollection === 1) {
				await Blog.update(
					{ statusFlag: 'D', deletedBy: userID.id },
					{
						where: { id: id },
						paranoid: false
					}
				)
				res.status(201).send({
					message: 'Blog was deleted successfully.'
				})
			} else {
				res.status(404).send({
					message: `Cannot delete Blog with id=${id}. Maybe Blog was not found or req.body is empty!`
				})
			}
		} catch (e) {
			res.status(400).send({
				message: 'Error updating Blog with id=' + id,
				detail: e.message || 'Some error occurred while creating the Blog.'
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
			const blogCollection = await Blog.destroy({ where: {} })

			if (blogCollection) {
			}

			res.status(201).send({
				message: `${blogCollection} Blogs were deleted successfully!`
			})
		} catch (err) {
			res.status(400).send({
				message: err.message || 'Some error occurred while removing all Blogs.'
			})
		}
	}
}
