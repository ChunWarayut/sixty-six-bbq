module.exports = (sequelize, Sequelize) => {
	const Status = sequelize.define(
		'Status',
		{
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
		},
		{
			sequelize,
			modelName: 'Status',
			tableName: 'Status',
			paranoid: true
		}
	)

	return Status
}
