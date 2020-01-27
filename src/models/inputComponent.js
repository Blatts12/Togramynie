var mongoose = require("mongoose");

module.exports = mongoose.model("inputComponent",{
  "type":String,
  "value":Number
});