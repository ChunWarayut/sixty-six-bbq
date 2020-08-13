module.exports = (sequelize, Sequelize) => {
  const ReferenceValue = sequelize.define("ReferenceValue", {
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
      type: Sequelize.CHAR(1)
    }
  });

  return ReferenceValue;
};
