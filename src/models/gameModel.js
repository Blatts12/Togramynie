var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var gameStats = new Schema({
    value_name: String,
    value_max: Number,
    value_default: Number
});

var inputComponent = new Schema({
    value: Number
});

var gameStatsModel = mongoose.model("GameStatsModel", gameStats);
var inputComponentModel = mongoose.model("Input", inputComponent);

module.exports = mongoose.model("TestGame",{
    game_name: String,
    game_max_players: Number,
    game_stats: [gameStats],
    incrementators: [inputComponent],
    decrementators: [inputComponent]
});

module.exports.CreateInputComponent = (value) => {
    var input = new inputComponentModel();
    input.value = value;

    return input;
};

module.exports.CreateGameStats = (name, max, defaultVal) =>{
    var input = new gameStatsModel();
    input.name = name;
    input.max = max;
    input.defaultVal = defaultVal;
};