var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var gameStats = new Schema(
  {
    value_name: String,
    value_max: Number,
    value_min: Number,
    value_default: Number
  },
  { _id: false }
);

var inputComponent = new Schema(
  {
    value: Number
  },
  { _id: false }
);

var gameStatsModel = mongoose.model("GameStatsModel", gameStats);
var inputComponentModel = mongoose.model("Input", inputComponent);

module.exports = mongoose.model("TestGame", {
  game_name: String,
  game_max_players: Number,
  game_stats: [gameStats],
  incrementators: [Number],
  decrementators: [Number]
});
