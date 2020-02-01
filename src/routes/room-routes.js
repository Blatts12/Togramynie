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

var isValidPassword = function(room, password) {
  return bCrypt.compareSync(password, room.password);
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
        newRoom.decs = req.body.game.decrementators;
        newRoom.incs = req.body.game.incrementators;

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
    Room.findOne({ room_name: req.body.room_name }, (err, room) => {
      if (err) res.status(500).send();
      else if (!room)
        res.status(200).json({ msg: "Pokój to ten nazwie nie istnieje" });
      else if (req.body.password && !isValidPassword(room, req.body.password))
        res.status(200).json({ msg: "Niepoprawne hasło!" });
      else res.status(200).json({ msg: "Success", room });
    });
  });

  Router.post("/api/room/join", (req, res, next) => {
    Room.findOne(
      {
        room_name: req.body.room_name,
        "users.username": req.body.username
      },
      (err, room) => {
        if (err) res.status(500).send();
        else if (room) res.status(200).json({ msg: "Jesteś w tym pokoju!" });
        else if (room && room.users.length == room.max_players)
          res.status(200).json({ msg: "Pokój jest pełny" });
        else {
          var userElement = CreateUserElement(
            req.body.username,
            req.body.game.game_stats,
            false
          );

          Room.updateOne(
            { room_name: req.body.room_name },
            {
              $push: { users: userElement }
            },
            err => {
              if (err) res.status(500).send();
              else
                res.status(200).json({ msg: "Success", userData: userElement });
            }
          );
        }
      }
    );
  });

  Router.post("/api/room/check", (req, res, next) => {
    Room.findOne(
      {
        room_name: req.body.room_name,
        "users.username": req.body.username
      },
      (err, room) => {
        if (err) res.status(500).send();
        else if (!room)
          res
            .status(200)
            .json({ msg: "Pokój nie istnieje lub do nie należysz do niego!" });
        else res.status(200).json({ msg: "Success" });
      }
    );
  });

  Router.delete("/api/room", (req, res, next) => {
    Room.deleteOne({ room_name: req.body.room_name }, err => {
      if (err) res.status(500).send();
      else res.status(200).json({ msg: "Success" });
    });
  });

  Router.post("/api/room/update", (req, res, next) => {
    Room.findOne(
      {
        room_name: req.body.room_name
      },
      (err, room) => {
        if (err) res.status(500).send();
        else if (!room) res.status(200).json({ msg: "Pokój nie istnieje!" });
        else {
          for (let u of room.users) {
            if (u.username == req.body.username) {
              for (let v of u.values) {
                if (v.value_name == req.body.value_name) {
                  v.value = req.body.new_value;
                }
              }
            }
          }
          room.save(err => {
            if (err) console.log(err);
          });
          res.status(200).json({ ok: "OK" });
        }
      }
    );
  });
  return Router;
};
