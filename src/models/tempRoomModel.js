var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserElementSchema = new Schema(
  {
    username: String,
    owner: Boolean,
    value: Number
  },
  { _id: false }
);
var UserElement = mongoose.model("UE", UserElementSchema);

module.exports = mongoose.model("TestRoom", {
  room_name: String,
  game_id: String,
  password: String,
  max_players: Number,
  create_date: Date,
  limit_date: Date,
  users: [UserElementSchema]
});

module.exports.createUserElement = (username, value, owner) => {
  var userElement = new UserElement();
  userElement.username = username;
  userElement.owner = owner;
  userElement.value = value;

  return userElement;
};
