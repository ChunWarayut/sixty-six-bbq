module.exports = (sequelize, Sequelize) => {
  const FoodMenu = sequelize.define("FoodMenu", {
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
    image: {
      type: Sequelize.INTEGER
    },
    slide: {
      type: Sequelize.BOOLEAN
    },
    statusFlag: {
      type: Sequelize.CHAR(1)
    }
  });

  return FoodMenu;
};
