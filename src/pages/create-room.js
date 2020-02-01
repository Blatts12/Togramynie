require("dotenv").config();
import Form from "react-bootstrap/Form";
import Router from "next/router";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { DropdownButton, Dropdown } from "react-bootstrap";

const { useState } = require("react");

function CreateRoom({ user, gameList }) {
  const [room_name, setRoomName] = useState("");
  const [password, setPassword] = useState("");
  const [game_name, setGameName] = useState("");

  async function getGame(name) {
    let temp = await axios
      .post("/api/game", {
        game_name: name
      })
      .then(response => {
        return response.data.game;
      });
    return temp;
  }

  async function submit(event) {
    event.preventDefault();
    if (game_name === "" || room_name === "" || password === "") {
      alert("Uzupełnij wszystkie pola!");
    }
    let game = await getGame(game_name);
    console.log(game);

    await axios
      .put("/api/room", {
        room_name,
        password,
        username: user.username,
        game
      })
      .then(response => {
        if (response.data.msg == "Success") {
          window.location.href = process.env.BASE_URL + "room/" + room_name;
        } else {
          alert(response.data.msg);
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <Container>
      <Form onSubmit={submit}>
        <br />
        <Form.Label>
          <h2>Utwórz pokój</h2>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Nazwa pokoju"
          onChange={e => setRoomName(e.target.value)}
          value={room_name}
        />
        <Form.Control
          type="password"
          placeholder="Hasło"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
        <DropdownButton
          title={game_name === "" ? "Lista gier" : game_name}
          variant="block"
          onSelect={key => {
            setGameName(key);
          }}
        >
          {gameList.map(game => {
            return (
              <Dropdown.Item
                key={game}
                eventKey={game}
                style={{ color: "black" }}
              >
                {game}
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
        <br />
        <br />
        <Button variant="primary" type="submit">
          Stwórz
        </Button>
      </Form>
    </Container>
  );
}

CreateRoom.getInitialProps = async ctx => {
  axios.defaults.baseURL = process.env.BASE_URL;
  var gameList = await axios.post("/api/game/list").then(response => {
    return response.data.gameList;
  });

  return { gameList };
};

export default CreateRoom;
