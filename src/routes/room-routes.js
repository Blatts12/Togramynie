const bodyParser = require("body-parser");
const express = require("express");
const Router = express.Router();
const TestRoom = require("../models/tempRoomModel");
const createUserElement = TestRoom.createUserElement;

const Room = require("../models/roomModel");
const CreateUserElement = Room.createUserElement;
const bCrypt = require("bcrypt");
const axios = require("axios");

var createHash = function(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

var isValidPassword = function(user, password) {
  return bCrypt.compareSync(password, user.password);
};

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

Router.use(bodyParser.json());

module.exports = function() {
  Router.put("/api/room", (req, res, next) => {
    Room.findOne({ room_name: req.body.room_name }, (err, room) => {
      if (err) res.status(500).send();
      else if (room)
        res.status(200).json({ msg: "Pokój z tą nazwą już istnieje!" });
      else {
        var newRoom = new Room();
        newRoom.room_name = req.body.room_name;
        newRoom.game_name = req.body.game.game_name;
        newRoom.password = createHash(req.body.password);
        newRoom.max_players = req.body.game.game_max_players;
        newRoom.create_date = new Date();
        newRoom.limit_date = addDays(new Date(), 3);

        newRoom.users.push(
          CreateUserElement(req.body.username, req.body.game.game_stats, true)
        );

        newRoom.save(function(err) {
          if (err) throw err;
          res.status(200).json({ msg: "Success" });
        });
      }
    });
  });

  Router.post("/api/room", (req, res, next) => {
    Room.find(
      {
        room_name: req.body.room_name,
        "users.username": req.body.username
      },
      (err, room) => {
        if (err) res.status(500).send();
        else if (!room)
          res.status(200).json({ msg: "Pokój z tą nazwą nie istnieje!" });
        else res.status(200).json({ room });
      }
    );
  });

  Router.delete("/api/room", (req, res, next) => {
    Room.deleteOne({ room_name: req.body.room_name }, err => {
      if (err) res.status(500).send();
      else res.status(200).json({ msg: "Usuwanie zakończone pomyślnie!" });
    });
  });

  Router.put("/api/room/user/add", (req, res, next) => {
    Room.findOne({ room_name: req.body.room_name }, (err, room) => {
      if (err) res.status(500).send();
      else if (!room)
        res.status(200).json({ msg: "Pokój z tą nazwą nie istnieje!" });
      else {
        let game = axios
          .post("/api/game", {
            game_name: room.game_name
          })
          .then(resp => resp.data.game);
        room.update({
          $push: {
            users: createUserElement(req.body.user_name, game.game_stats, false)
          }
        });
      }
    });
  });

  Router.post("/api/room/user/check", (req, res, next) => {
    TestRoom.findOne(
      {
        room_name: req.body.room_name,
        "users.username": req.body.username
      },
      (err, test) => {
        if (err) res.status(500).send();
        else if (!test)
          res.status(200).json({
            msg: "Pokój nie istnieje lub nie należysz do tego pokoju!"
          });
        else res.status(200).json({ msg: "Success" });
      }
    );
  });

  Router.post("/api/room/user/value/update", (req, res, next) => {
    TestRoom.update(
      { room_name: req.body.room_name, "users.user_id": req.body.user_id },
      { $set: { "users.$.value": req.body.new_value } }
    );
  });

  Router.post("/api/room/join", (req, res, next) => {
    TestRoom.findOne({ room_name: req.body.room_name }, (err, room) => {
      if (err) res.status(500).send();
      else if (!room)
        res.status(200).json({ msg: "Pokój z tą nazwą nie istnieje!" });
      else if (!isValidPassword(room, req.body.password))
        res.status(200).json({ msg: "Niepoprawne hasło!" });
      else {
        TestRoom.find(
          {
            room_name: req.body.room_name,
            "users.username": req.body.username
          },
          (err, test) => {
            if (err) res.status(500).send();
            else if (test.length > 0)
              res.status(200).json({ msg: "Jesteś w tym pokoju!" });
            else {
              let game = axios
                .post("/api/game", {
                  game_name: room.game_name
                })
                .then(resp => resp.data.game);
              var userElement = createUserElement(
                req.body.username,
                game.game_stats,
                false
              );
              TestRoom.updateOne(
                { room_name: req.body.room_name },
                {
                  $push: { users: userElement }
                },
                err => {
                  if (err) res.status(500).send();
                  else res.status(200).json({ msg: "Success" });
                }
              );
            }
          }
        );
      }
    });
  });
  return Router;
};
