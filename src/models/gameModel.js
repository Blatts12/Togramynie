var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var gameStats = new Schema({
    value_name: String,
    value_max: Number,
    value_default: Number
},{ _id: false });

var inputComponent = new Schema({
    value: Number
},{ _id: false });

var gameStatsModel = mongoose.model("GameStatsModel", gameStats);
var inputComponentModel = mongoose.model("Input", inputComponent);

module.exports = mongoose.model("TestGame",{
    game_name: String,
    game_max_players: Number,
    game_stats: [gameStats],
    incrementators: [Number],
    decrementators: [Number]
});

module.exports.CreateInputComponent = (value) => {
    var input = new inputComponentModel();
    input.value = value;
    return input;
};

module.exports.CreateGameStats = (name, max, value_default) =>{
    var input = new gameStatsModel();
    input.name = name;
    input.max = max;
    input.value_default = value_default;
    return input;
};