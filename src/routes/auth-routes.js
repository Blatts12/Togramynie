const bodyParser = require("body-parser");
const express = require("express");
const Router = express.Router();
const User = require("../models/userModel");
const bCrypt = require("bcrypt");

const pwRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

var createHash = function(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

Router.use(bodyParser.json());

module.exports = function(passport) {
  Router.post("/login", function(req, res, next) {
    passport.authenticate("login", function(err, user, info) {
      if (err) return next(err);

      if (!user) return res.status(404).send();

      req.logIn(user, function(err) {
        if (err) return next(err);
        return res.status(200).send();
      });
    })(req, res, next);
  });

  Router.post("/signup", function(req, res, next) {
    User.findOne({ username: req.body.username }, function(err, user) {
      if (err) res.status(500).send();
      else if (!pwRegex.test(req.body.password))
        res.status(200).json({ msg: "Hasło nie spełnia wymagań!" });
      else if (user)
        res.status(200).json({ msg: "Nazwa użytkownika nie jest dostępna!" });
      else {
        var newUser = new User();
        newUser.username = req.body.username;
        newUser.password = createHash(req.body.password);
        newUser.reg_date = new Date();
        newUser.save(function(err) {
          if (err) throw err;
          res.status(200).json({ msg: "Success" });
        });
      }
    });
  });

  Router.get("/logout", function(req, res) {
    req.session.destroy(function(err) {
      res.redirect("/");
    });
  });

  return Router;
};
