module.exports = (sequelize, Sequelize) => {
	const Blog = sequelize.define(
		'Blog',
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
			modelName: 'Blog',
			tableName: 'Blog',
			paranoid: true
		}
	)

	return Blog
}
