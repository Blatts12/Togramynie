var mongoose = require("mongoose");

module.exports = mongoose.model("User", {
  username: String,
  password: String,
  reg_date: Date
});
