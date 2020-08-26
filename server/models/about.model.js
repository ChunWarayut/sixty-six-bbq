module.exports = (sequelize, Sequelize) => {
	let About = sequelize.define(
		'About',
		{
			titleTH: {
				type: Sequelize.STRING(100)
			},
			titleEN: {
				type: Sequelize.STRING(100)
			},
			detailTH: {
				type: Sequelize.TEXT
			},
			detailEN: {
				type: Sequelize.TEXT
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
		},
		{
			sequelize,
			modelName: 'About',
			tableName: 'About',
			paranoid: true
		}
	)

	About.associate = (models) => {
		About.belongsTo(models.User, {
			foreignKey: 'createdBy',
			targetKey: 'id',
			as: 'UserCreate'
		})
		About.belongsTo(models.User, {
			foreignKey: 'updatedBy',
			targetKey: 'id',
			as: 'UserUpdate'
		})
	}

	return About
}
