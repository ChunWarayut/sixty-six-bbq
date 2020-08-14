module.exports = app => {
  const blog = require("../controllers/blog.controller.js");

  var router = require("express").Router();

  // Create a new Blog
  router.post("/", blog.create);

  // Retrieve all Blog
  router.get("/", blog.findAll);

  // Retrieve a single Blog with id
  router.get("/:id", blog.findOne);

  // Update a Blog with id
  router.put("/:id", blog.update);

  // Delete a Blog with id
  router.delete("/:id", blog.delete);

  // Delete all Blog
  router.delete("/", blog.deleteAll);

  app.use('/api/blog', router);
};
