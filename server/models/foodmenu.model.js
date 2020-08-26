module.exports = (sequelize, Sequelize) => {
	const FoodMenu = sequelize.define(
		'FoodMenu',
		{
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
		},
		{
			sequelize,
			modelName: 'FoodMenu',
			tableName: 'FoodMenu',
			paranoid: true
		}
	)

	return FoodMenu
}
