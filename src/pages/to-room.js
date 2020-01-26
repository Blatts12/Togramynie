require("dotenv").config();
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
const { useState } = require("react");

export default function Login() {
  const [room_name, setRoomName] = useState("");

  async function submit(event) {
    event.preventDefault();
    axios
      .put("/api/room/join", {
        room_name
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
          Login
        </Button>
      </Form>
    </Container>
  );
}
