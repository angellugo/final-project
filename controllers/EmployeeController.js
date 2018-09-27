const db = require('../models');

// Defining methods for the booksController
module.exports = {

  findAll: function(req, res) {
    db.Employee
        .find(req.query)
        .sort({date: -1})
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Employee
        .create(req.body)
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Employee
        .findById({_id: req.params.id})
        .then((dbModel) => dbModel.remove())
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
  },
  clockIn: function(req, res) {
    db.Employee
        .findOneAndUpdate({_id: req.params.id}, {$push: {clockIn: Date.now()}})
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
  },
  clockOut: function(req, res) {
    db.Employee
        .findOneAndUpdate({_id: req.params.id}, {$push: {clockOut: Date.now()}})
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
  },

};
