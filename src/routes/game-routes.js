const bodyParser = require("body-parser");
const express = require("express");
const gameModel = require("../models/gameModel");
const createGameStats = gameModel.CreateGameStats;
const createInputComponent = gameModel.CreateInputComponent;
const Router = express.Router();

Router.use(bodyParser.json());

module.exports = function() {
  Router.put("/api/game", (req, res, next) => {
    gameModel.findOne({game_name: req.body.game_name}, (err, game)=>{
      if(err) res.status(500).send();
      else if(game){
        res.status(200).json({msg: "Gra z tą nazwą już istnieje!"});
      }
      else{
        var newGame = new gameModel();
        newGame.game_name = req.body.game_name;
        newGame.game_max_players = req.body.game_max_players;
        console.log(req.body.gameStats);
        newGame.game_stats = req.body.gameStats;  
        newGame.incrementators = req.body.incrementators;
        newGame.decrementators = req.body.decrementators;

        newGame.save(function(err){
          if(err) throw err;
          res.status(200).json({msg: "Succes"});
        });
      }
    });
  });

  Router.post("/api/game", (req, res, next) => {
    console.log(req.body);
    gameModel.findOne({
      game_name: req.body.game_name
    },
    (err, game) => {
      if(err) res.status(500).send();
      else if(!game){
        res.status(200).json({msg: "Gra z tą nazwą nie istnieje!"});
      }else{
        res.status(200).json({game});
      }
    });
  });

  Router.post("/api/game/list", (req, res, next) =>{
    gameModel.find({}, (err,games) => {
      if(err) res.status(500).send();
      else{
        var gamesReMap = [];
        games.forEach(game => {
          gamesReMap.push(game.game_name);
        })
        res.status(200).json({gamesList: gamesReMap});
      }
    });
  });

  return Router;
};
