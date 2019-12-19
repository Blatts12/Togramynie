const bodyParser = require("body-parser");
const express = require("express");
const Router = express.Router();

Router.use(bodyParser.json());

module.exports = function() {
  Router.get("/cipka", (req, res) => {
    res.redirect("/profile");
  });
  return Router;
};
