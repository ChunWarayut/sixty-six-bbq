const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.about = require("./about.model")(sequelize, Sequelize);
db.blog = require("./blog.model.js")(sequelize, Sequelize);
db.contact = require("./contact.model")(sequelize, Sequelize);
db.foodmenu = require("./foodmenu.model")(sequelize, Sequelize);
db.image = require("./image.model")(sequelize, Sequelize);
db.referencevalue = require("./referencevalue.model")(sequelize, Sequelize);
db.status = require("./status.model")(sequelize, Sequelize);
db.user = require("./user.model")(sequelize, Sequelize);
db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);


module.exports = db;
