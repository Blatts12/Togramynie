require("dotenv").config();
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from "axios";
const { useState } = require("react");

export default function ToRoom({ user }) {
  const [room_name, setRoomName] = useState("");

  async function submit(event) {
    event.preventDefault();
    axios
      .post("/api/room/user/check", {
        room_name,
        username: user.username
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
        <Form.Label>
          <h2>Wejdź do pokoju</h2>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Nazwa pokoju"
          onChange={e => setRoomName(e.target.value)}
          value={room_name}
        />
        <br />
        <br />
        <Button variant="primary" type="submit">
          Wejdź
        </Button>
      </Form>
    </Container>
  );
}
