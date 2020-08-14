const db = require("../models");
const Blog = db.blog;
const Op = db.Sequelize.Op;

// Create and Save a new Blog
exports.create = (req, res) => {
  // Validate request
  if (!req.body.titleTH || !req.body.titleEN || !req.body.detailTH || !req.body.detailEN || !req.body.image || !req.body.statusFlag) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Blog
  const blog = {
    titleTH: req.body.titleTH,
    titleEN: req.body.titleEN,
    detailTH: req.body.detailTH,
    detailEN: req.body.detailEN,
    image: req.body.image,
    statusFlag: req.body.statusFlag
  };

  // Save Blog in the database
  Blog.create(blog)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Blog."
      });
    });
};

// Retrieve all Blogs from the database.
exports.findAll = (req, res) => {
  const titleTH = req.query.titleTH;
  const titleEN = req.query.titleEN;
  var condition = titleTH ? { titleTH: { [Op.like]: `%${titleTH}%` } } : titleEN ? { titleEN: { [Op.like]: `%${titleEN}%` } } : null ;

  Blog.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Blogs."
      });
    });
};

// Find a single Blog with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Blog.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Blog with id=" + id
      });
    });
};

// Update a Blog by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Blog.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Blog was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Blog with id=${id}. Maybe Blog was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Blog with id=" + id
      });
    });
};

// Delete a Blog with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Blog.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Blog was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Blog with id=${id}. Maybe Blog was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Blog with id=" + id
      });
    });
};

// Delete all Blogs from the database.
exports.deleteAll = (req, res) => {
  Blog.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Blogs were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Blogs."
      });
    });
};

// find all published Blog
exports.findAllPublished = (req, res) => {
  Blog.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Blogs."
      });
    });
};
