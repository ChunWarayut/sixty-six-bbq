module.exports = (sequelize, Sequelize) => {
	let Image = sequelize.define(
		'Image',
		{
			referenceID: {
				type: Sequelize.INTEGER
			},
			referenceType: {
				type: Sequelize.STRING(50)
			},
			name: {
				type: Sequelize.STRING(50)
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
		},
		{
			sequelize,
			modelName: 'Image',
			tableName: 'Image',
			paranoid: true
		}
	)

	return Image
}
