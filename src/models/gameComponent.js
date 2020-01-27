var mongoose = require("mongoose");

module.exports = mongoose.model("gameComponent",{
    "name":String,
    "minPlayers":Number,
    "maxPlayers":Number,
    
    "displayComponents":[{
        "name":String,
        "type":String,
        "value":Number,
        "learable":Boolean,
    }],

    "inputComponents":{
        "incrementors":[
            "inputComponent"
        ],
        "decrementors":[
            "inputComponent"
        ]
    },
    "gameDescription":String
});