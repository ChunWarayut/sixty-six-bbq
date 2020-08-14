module.exports = app => {
  const about = require("../controllers/about.controller.js");

  var router = require("express").Router();

  // Create a new About
  router.post("/", about.create);

  // Retrieve all About
  router.get("/", about.findAll);

  // Retrieve a single About with id
  router.get("/:id", about.findOne);

  // Update a About with id
  router.put("/:id", about.update);

  // Delete a About with id
  router.delete("/:id", about.delete);

  // Delete all About
  router.delete("/", about.deleteAll);

  app.use('/api/about', router);
};
