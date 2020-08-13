module.exports = (sequelize, Sequelize) => {
  const Contact = sequelize.define("Contact", {
    addressTH: {
      type: Sequelize.STRING(100)
    },
    addressEN: {
      type: Sequelize.STRING(100)
    },
    villageTH: {
      type: Sequelize.STRING(100)
    },
    villageEN: {
      type: Sequelize.STRING(100)
    },
    alleyTH: {
      type: Sequelize.STRING(100)
    },
    alleyEN: {
      type: Sequelize.STRING(100)
    },
    roadTH: {
      type: Sequelize.STRING(100)
    },
    roadEN: {
      type: Sequelize.STRING(100)
    },
    subdistrictTH: {
      type: Sequelize.STRING(100)
    },
    subdistrictEN: {
      type: Sequelize.STRING(100)
    },
    districtTH: {
      type: Sequelize.STRING(100)
    },
    districtEN: {
      type: Sequelize.STRING(100)
    },
    provinceTH: {
      type: Sequelize.STRING(100)
    },
    provinceEN: {
      type: Sequelize.STRING(100)
    },
    post: {
      type: Sequelize.STRING(5)
    },
    email: {
      type: Sequelize.STRING(255)
    },
    tel: {
      type: Sequelize.STRING(10)
    },
    image: {
      type: Sequelize.INTEGER
    },
    latitude:{
      type: Sequelize.STRING(50)
    },
    longitude:{
      type: Sequelize.STRING(50)
    },
    statusFlag: {
      type: Sequelize.CHAR(1)
    }
  });

  return Contact;
};
