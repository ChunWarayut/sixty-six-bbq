'use strict'
const master = require('../services/master.service')

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		const date = new Date()
		await queryInterface.bulkInsert(
			'Status',
			[
				{
					name: 'ADMIN',
					level: 1,
					createdBy: 1,
					updatedBy: 1,
					createdAt: date,
					updatedAt: date
				},
				{
					name: 'USER',
					level: 2,
					createdBy: 1,
					updatedBy: 1,
					createdAt: date,
					updatedAt: date
				}
			],
			{}
		)
		const userPassword = await master.generatePassword('P@ssw0rd')
		const statusID = await master.getStatusByName('ADMIN')
		const username = await require('os').userInfo().username
		await queryInterface.bulkInsert(
			'User',
			[
				{
					username: username,
					password: userPassword,
					status: statusID.id,
					firstname: username,
					lastname: 'DEVELOPER',
					createdBy: 1,
					updatedBy: 1,
					createdAt: date,
					updatedAt: date
				}
			],
			{}
		)
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete('Status', null, {})
		await queryInterface.bulkDelete('User', null, {})
	}
}
