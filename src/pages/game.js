require("dotenv").config();
import Form from "react-bootstrap/Form";
import Router from "next/router";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from "axios";
const { useState } = require("react");

export default function Signup() {
  const [gameName, setGameName] = useState("");
  const [maxPlayers, setMaxPlayers] = useState("");
  const [gameStatsName, setGameStatsName] = useState("");
  const [gameStatsMax, setGameStatsMax] = useState("");
  const [gameStatsDefault, setGameStatsDefault] = useState("");
  const [incrementators, setIncrementators] = useState("");
  const [decrementators, setDecrementators] = useState("");

  function prepareGameStats(){
      var tab = [];
      var names = gameStatsName.split(",");
      var max = gameStatsMax.split(",");
      var defaults = gameStatsDefault.split(",");
      for(let i = 0; i<names.length; i++){
        tab.push({value_name: names[i], value_max: max[i], value_default: defaults[i]});
      }
      return tab;
  }

  async function submit(event) {
    event.preventDefault();
      axios
        .put("/api/game", {
          game_name: gameName,
          game_max_players: maxPlayers,
          gameStats: prepareGameStats(),
          incrementators: incrementators.split(","),
          decrementators: decrementators.split(",")
        })
        .then(response => {
          if (response.data.msg == "Success") {
            window.location.href = process.env.BASE_URL;
          } else {
            alert(response.data.msg);
          }
        })
        .catch(err => console.log(err));
  }

  return (
    <Container>
      <Form onSubmit={submit}>
        <Form.Label>
          <h2>Dodaj grę!</h2>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="GameName"
          onChange={e => setGameName(e.target.value)}
          value={gameName}
        />
        <Form.Control
          type="text"
          placeholder="MaxPlayers"
          onChange={e => setMaxPlayers(e.target.value)}
          value={maxPlayers}
        />
        <Form.Control
          type="text"
          placeholder="GameStatsName"
          onChange={e => setGameStatsName(e.target.value)}
          value={gameStatsName}
        />
        <Form.Control
          type="text"
          placeholder="GameStatsMax"
          onChange={e => setGameStatsMax(e.target.value)}
          value={gameStatsMax}
        />
        <Form.Control
          type="text"
          placeholder="GameStatsDefault"
          onChange={e => setGameStatsDefault(e.target.value)}
          value={gameStatsDefault}
        />
        <Form.Control
          type="text"
          placeholder="Incrementators"
          onChange={e => setIncrementators(e.target.value)}
          value={incrementators}
        />
        <Form.Control
          type="text"
          placeholder="Decrementators"
          onChange={e => setDecrementators(e.target.value)}
          value={decrementators}
        />
        <Button variant="primary" type="submit">
            Dodaj
        </Button>
      </Form>
    </Container>
  );
}
