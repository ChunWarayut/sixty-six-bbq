const db = require("../models");
const About = db.about;
const Op = db.Sequelize.Op;

// Create and Save a new About
exports.create = (req, res) => {
  // Validate request
  if (!req.body.titleTH || !req.body.titleEN || !req.body.detailTH || !req.body.detailEN || !req.body.image || !req.body.statusFlag) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a About
  const about = {
    titleTH: req.body.titleTH,
    titleEN: req.body.titleEN,
    detailTH: req.body.detailTH,
    detailEN: req.body.detailEN,
    image: req.body.image,
    statusFlag: req.body.statusFlag
  };

  // Save About in the database
  About.create(about)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the About."
      });
    });
};

// Retrieve all Abouts from the database.
exports.findAll = (req, res) => {
  const titleTH = req.query.titleTH;
  const titleEN = req.query.titleEN;
  var condition = titleTH ? { titleTH: { [Op.like]: `%${titleTH}%` } } : titleEN ? { titleEN: { [Op.like]: `%${titleEN}%` } } : null ;

  About.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Abouts."
      });
    });
};

// Find a single About with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  About.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving About with id=" + id
      });
    });
};

// Update a About by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  About.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "About was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update About with id=${id}. Maybe About was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating About with id=" + id
      });
    });
};

// Delete a About with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  About.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "About was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete About with id=${id}. Maybe About was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete About with id=" + id
      });
    });
};

// Delete all Abouts from the database.
exports.deleteAll = (req, res) => {
  About.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Abouts were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Abouts."
      });
    });
};

// find all published About
exports.findAllPublished = (req, res) => {
  About.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Abouts."
      });
    });
};
