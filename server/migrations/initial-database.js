module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Image', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			referenceID: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			referenceType: {
				type: Sequelize.STRING(50),
				allowNull: false
			},
			name: {
				type: Sequelize.STRING(50),
				allowNull: false
			},
			level: {
				type: Sequelize.INTEGER
			},
			statusFlag: {
				type: Sequelize.CHAR(1),
				allowNull: false,
				defaultValue: 'A'
			},
			createdBy: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedBy: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			deletedBy: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			deletedAt: {
				allowNull: true,
				type: Sequelize.DATE
			}
		})
		await queryInterface.createTable('About', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			titleTH: {
				type: Sequelize.STRING(100),
				allowNull: false
			},
			titleEN: {
				type: Sequelize.STRING(100),
				allowNull: false
			},
			detailTH: {
				type: Sequelize.STRING(100),
				allowNull: false
			},
			detailEN: {
				type: Sequelize.STRING(100),
				allowNull: false
			},

			statusFlag: {
				type: Sequelize.CHAR(1),
				allowNull: false,
				defaultValue: 'A'
			},
			createdBy: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedBy: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			deletedBy: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			deletedAt: {
				allowNull: true,
				type: Sequelize.DATE
			}
		})
		await queryInterface.createTable('Blog', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			titleTH: {
				type: Sequelize.STRING(100),
				allowNull: false
			},
			titleEN: {
				type: Sequelize.STRING(100),
				allowNull: false
			},
			detailTH: {
				type: Sequelize.STRING(100),
				allowNull: false
			},
			detailEN: {
				type: Sequelize.STRING(100),
				allowNull: false
			},

			statusFlag: {
				type: Sequelize.CHAR(1),
				allowNull: false,
				defaultValue: 'A'
			},
			createdBy: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedBy: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			deletedBy: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			deletedAt: {
				allowNull: true,
				type: Sequelize.DATE
			}
		})
		await queryInterface.createTable('Contact', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			addressTH: {
				type: Sequelize.STRING(100)
			},
			addressEN: {
				type: Sequelize.STRING(100)
			},
			villageTH: {
				type: Sequelize.STRING(100)
			},
			villageEN: {
				type: Sequelize.STRING(100)
			},
			alleyTH: {
				type: Sequelize.STRING(100)
			},
			alleyEN: {
				type: Sequelize.STRING(100)
			},
			roadTH: {
				type: Sequelize.STRING(100)
			},
			roadEN: {
				type: Sequelize.STRING(100)
			},
			subdistrictTH: {
				type: Sequelize.STRING(100)
			},
			subdistrictEN: {
				type: Sequelize.STRING(100)
			},
			districtTH: {
				type: Sequelize.STRING(100)
			},
			districtEN: {
				type: Sequelize.STRING(100)
			},
			provinceTH: {
				type: Sequelize.STRING(100)
			},
			provinceEN: {
				type: Sequelize.STRING(100)
			},
			post: {
				type: Sequelize.STRING(5)
			},
			email: {
				type: Sequelize.STRING(255)
			},
			tel: {
				type: Sequelize.STRING(10)
			},
			latitude: {
				type: Sequelize.STRING(50)
			},
			longitude: {
				type: Sequelize.STRING(50)
			},
			statusFlag: {
				type: Sequelize.CHAR(1),
				defaultValue: 'A'
			},
			createdBy: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedBy: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			deletedBy: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			deletedAt: {
				allowNull: true,
				type: Sequelize.DATE
			}
		})
		await queryInterface.createTable('FoodMenu', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			title: {
				type: Sequelize.INTEGER
			},
			type: {
				type: Sequelize.INTEGER
			},
			nameTH: {
				type: Sequelize.STRING(50)
			},
			nameEN: {
				type: Sequelize.STRING(50)
			},
			detailTH: {
				type: Sequelize.STRING(255)
			},
			detailEN: {
				type: Sequelize.STRING(255)
			},
			price: {
				type: Sequelize.INTEGER
			},
			slide: {
				type: Sequelize.BOOLEAN
			},
			statusFlag: {
				type: Sequelize.CHAR(1),
				defaultValue: 'A'
			},
			createdBy: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedBy: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			deletedBy: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			deletedAt: {
				allowNull: true,
				type: Sequelize.DATE
			}
		})
		await queryInterface.createTable('ReferenceValue', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			titleTH: {
				type: Sequelize.STRING(100)
			},
			titleEN: {
				type: Sequelize.STRING(100)
			},
			code: {
				type: Sequelize.STRING(50)
			},
			statusFlag: {
				type: Sequelize.CHAR(1),
				defaultValue: 'A'
			},
			createdBy: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedBy: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			deletedBy: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			deletedAt: {
				allowNull: true,
				type: Sequelize.DATE
			}
		})
		await queryInterface.createTable('Status', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				type: Sequelize.STRING(100)
			},
			level: {
				type: Sequelize.INTEGER
			},
			statusFlag: {
				type: Sequelize.CHAR(1),
				defaultValue: 'A'
			},
			createdBy: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedBy: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			deletedBy: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			deletedAt: {
				allowNull: true,
				type: Sequelize.DATE
			}
		})
		await queryInterface.createTable('User', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			username: {
				type: Sequelize.STRING(50)
			},
			password: {
				type: Sequelize.STRING
			},
			status: {
				type: Sequelize.INTEGER
			},
			firstname: {
				type: Sequelize.STRING(100)
			},
			lastname: {
				type: Sequelize.STRING(100)
			},
			addressTH: {
				type: Sequelize.STRING(100)
			},
			addressEN: {
				type: Sequelize.STRING(100)
			},
			villageTH: {
				type: Sequelize.STRING(100)
			},
			villageEN: {
				type: Sequelize.STRING(100)
			},
			alleyTH: {
				type: Sequelize.STRING(100)
			},
			alleyEN: {
				type: Sequelize.STRING(100)
			},
			roadTH: {
				type: Sequelize.STRING(100)
			},
			roadEN: {
				type: Sequelize.STRING(100)
			},
			subdistrictTH: {
				type: Sequelize.STRING(100)
			},
			subdistrictEN: {
				type: Sequelize.STRING(100)
			},
			districtTH: {
				type: Sequelize.STRING(100)
			},
			districtEN: {
				type: Sequelize.STRING(100)
			},
			provinceTH: {
				type: Sequelize.STRING(100)
			},
			provinceEN: {
				type: Sequelize.STRING(100)
			},
			post: {
				type: Sequelize.STRING(5)
			},
			email: {
				type: Sequelize.STRING(255)
			},
			tel: {
				type: Sequelize.STRING(10)
			},
			statusFlag: {
				type: Sequelize.CHAR(1),
				defaultValue: 'A'
			},
			createdBy: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedBy: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			deletedBy: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			deletedAt: {
				allowNull: true,
				type: Sequelize.DATE
			}
		})
	},
	down: async (queryInterface /* , Sequelize */) => {
		await queryInterface.dropTable('Image')
		await queryInterface.dropTable('About')
		await queryInterface.dropTable('Blog')
		await queryInterface.dropTable('Contact')
		await queryInterface.dropTable('FoodMenu')
		await queryInterface.dropTable('ReferenceValue')
		await queryInterface.dropTable('Status')
		await queryInterface.dropTable('User')
	}
}
