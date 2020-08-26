module.exports = (sequelize, Sequelize) => {
	const ReferenceValue = sequelize.define(
		'ReferenceValue',
		{
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
		},
		{
			sequelize,
			modelName: 'ReferenceValue',
			tableName: 'ReferenceValue',
			paranoid: true
		}
	)

	return ReferenceValue
}
