/*var mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = mongoose.model("Room", {
  room_name: String,
  game_id: Schema.Types.ObjectId,
  password: String,
  max_players: Number,
  create_date: Date,
  limit_date: Date,
  user_element: [
    new Schema(
      {
        user_id: Schema.Types.ObjectId,
        value_element: [
          new Schema(
            {
              name: String,
              value: Number
            },
            { _id: false }
          )
        ]
      },
      { _id: false }
    )
  ]
});
*/
