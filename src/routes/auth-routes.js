const bodyParser = require("body-parser");
const express = require("express");
const Router = express.Router();

Router.use(bodyParser.json());

module.exports = function(passport) {
  /*Router.post(
    "/login",
    passport.authenticate("login", {
      successRedirect: "/profile",
      failureRedirect: "/login"
    })
  );*/

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
