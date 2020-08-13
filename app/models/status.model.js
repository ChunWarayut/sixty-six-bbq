module.exports = (sequelize, Sequelize) => {
  const Status = sequelize.define("Status", {
    name: {
      type: Sequelize.STRING(100)
    },
    level: {
      type: Sequelize.INTEGER
    },
    statusFlag: {
      type: Sequelize.CHAR(1)
    }
  });

  return Status;
};
