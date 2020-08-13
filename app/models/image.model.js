module.exports = (sequelize, Sequelize) => {
  const Image = sequelize.define("Image", {
    referenceCode: {
      type: Sequelize.INTEGER
    },
    referenceType: {
      type: Sequelize.STRING(50)
    },
    name: {
      type: Sequelize.STRING(50)
    },
    statusFlag: {
      type: Sequelize.CHAR(1)
    }
  });

  return Image;
};
