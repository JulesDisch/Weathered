const db = require("../models");
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const saltRounds = 10;
// Defining methods for the UsersController
module.exports = {
  findAll: function (req, res) {
    db.User
      .findAll(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // initial: function (req, res) {
  //   db.User
  //     .findOne({
  //       where: {
  //         username: req.body.username
  //       }
  //     })
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(425).json(err)
  //     );
  // },
  findOne: function (req, res) {
   
    console.log ("here we are")
    db.User
      .findOne({
        where: {
          id: user.id
        }
      }).then(function (dbModel) {
        if (!dbModel) {
          res.redirect('/');
        } else {
          bcrypt.compare(req.body.password, user.password, function (err, result) {
            if (result == true) {
              res.redirect('/home');
            } else {
              res.send('Incorrect password');
              res.redirect('/');
            }
          });
        }
      });
  },
  create: function (req, res) {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      db.User.create({
        username: req.body.username,
        email: req.body.email,
        password: hash
      }).then(function (data) {
        if (data) {
          console.log(data)
          res.json({ ...data.dataValues, success: true })
        }
      });
    });
  },
  update: function (req, res) {
    db.User
      .update({
        where: {
          id: req.body.id
        }
      }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.User
    db.User.destroy({
      where: {
        id: req.body.id
      }
    })

      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  logIn: function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    db.User.findOne({ where: { username: username } }).then(user => {
      if (!user) {
        res.status(401).send({ incorrectUsername: true, inSession: false, msg: "Incorrect Username" })
      } else if (!user.validPassword(password)) {
        res.status(401).send({ incorrectPassword: true, inSession: false, msg: "Incorrect Password" })
      } else {
        const token = jwt.sign({
          username: user.username,
          email: user.email,
          id: user.id
        }, "somesecretkey", {
          expiresIn: "1h"
        });
        res.status(200).send({
          inSession: true, msg: "Logged in!", 
          username: user.username,
          email: user.email,
          token: token,
          id: user.id,
         
        })
       
      }
    })
  },

  logOut: function (req, res) {
    res.clearCookie('user_sid');
    res.status(200).send({ inSession: false });
  }
};


