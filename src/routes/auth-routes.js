const bodyParser = require("body-parser");
const express = require("express");
const Router = express.Router();

Router.use(bodyParser.json());

module.exports = function(passport) {
  Router.post(
    "/login",
    passport.authenticate("login", {
      successRedirect: "/profile",
      failureRedirect: "/login"
    })
  );

  Router.post(
    "/signup",
    passport.authenticate("signup", {
      successRedirect: "/profile",
      failureRedirect: "/register"
    })
  );

  Router.get("/logout", function(req, res) {
    req.session.destroy(function(err) {
      res.redirect("/");
    });
  });

  return Router;
};
