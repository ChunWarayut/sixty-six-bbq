const Status = require('../models').Status
const User = require('../models').User
var passwordHash = require('password-hash')

module.exports = {
	async getStatusByName(name) {
		return Status.findOne({
			where: {
				name,
				statusFlag: 'A'
			}
		})
	},
	async getUserByUsername(username) {
		return User.findOne({
			where: {
				username,
				statusFlag: 'A'
			}
		})
	},
	async generatePassword(password) {
		return passwordHash.generate(password)
	}
}
