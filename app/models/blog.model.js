module.exports = (sequelize, Sequelize) => {
  const Blog = sequelize.define("Blog", {
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
    image: {
      type: Sequelize.INTEGER
    },
    statusFlag: {
      type: Sequelize.CHAR(1)
    }
  });

  return Blog;
};
