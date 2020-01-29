var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ValueElementSchema = new Schema(
  { name: String, value: Number },
  { _id: false }
);
var ValueElement = mongoose.model("VE", ValueElementSchema);

var UserElementSchema = new Schema(
  {
    user_id: Schema.Types.ObjectId,
    values: [ValueElementSchema]
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

module.exports.createUserElement = (userId, values) => {
  /*var valueElements = [];
  for (let v of values) {
    let valueElement = new ValueElement();
    valueElement.name = v.name;
    valueElement.value = v.value;
    valueElements.push(valueElement);
  }*/

  var userElement = new UserElement();
  userElement.user_id = userId;
  userElement.values = values;

  return userElement;
};

module.exports.createValueElementsFromGame = game => {};
