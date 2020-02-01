var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ValueElementSchema = new Schema(
  {
    value_name: String,
    value_max: Number,
    value_min: Number,
    value: Number
  },
  { _id: false }
);

var UserElementSchema = new Schema(
  {
    username: String,
    owner: Boolean,
    values: [ValueElementSchema]
  },
  { _id: false }
);

var UserElement = mongoose.model("UserElement", UserElementSchema);
var ValueElement = mongoose.model("ValueElement", ValueElementSchema);

module.exports = mongoose.model("Room", {
  room_name: String,
  game_name: String,
  password: String,
  max_players: Number,
  create_date: Date,
  exp_date: Date,
  incs: [Number],
  decs: [Number],
  users: [UserElementSchema]
});

module.exports.createUserElement = (username, gameStats, owner) => {
  var userElement = new UserElement();
  userElement.username = username;
  userElement.owner = owner;
  var valueElements = [];
  for (let stat of gameStats) {
    let tempValueElement = new ValueElement();
    tempValueElement.value_name = stat.value_name;
    tempValueElement.value = stat.value_default;
    tempValueElement.value_max = stat.value_max;
    tempValueElement.value_min = stat.value_min;

    valueElements.push(tempValueElement);
  }

  userElement.values = valueElements;

  return userElement;
};
