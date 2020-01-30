const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.Preference
      .findAll(req.query)
      // .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findOne: function(req, res) {
    db.Preference
      .findOne({where: {
        id: req.params.id
      }})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Preference
      .create({
          birthday: req.body.birthday,
          commute: req.body.commute
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Preference
      .update({where: {
        id: req.params.id
      } }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Preference
      .destroy({where: {
        id: req.params.id
      } })
     
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
