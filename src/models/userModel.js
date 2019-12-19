var mongoose = require("mongoose");

module.exports = mongoose.model("User", {
  username: String,
  password: String,
  email: String,
  reg_date: Date,
  profile_image: String
});
