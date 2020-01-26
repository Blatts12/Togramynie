require("dotenv").config();
import Form from "react-bootstrap/Form";
import Router from "next/router";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from "axios";
const { useState } = require("react");

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const pwRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  async function submit(event) {
    event.preventDefault();
    if (pwRegex.test(password)) {
      axios
        .post("/signup", {
          username,
          password
        })
        .then(response => {
          if (response.data.msg == "Success") {
            window.location.href = process.env.BASE_URL;
          } else {
            alert(response.data.msg);
          }
        })
        .catch(err => console.log(err));
    } else {
      alert("The password does not meet the requirements");
    }
  }

  return (
    <Container>
      <Form onSubmit={submit}>
        <Form.Label>
          <h2>Rejestracja</h2>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Nazwa użytkownika"
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
        <Form.Control
          type="password"
          placeholder="Hasło"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
        Hasło o długości 6 - 20, 1 cyfra, 1 mała litera, 1 wielka litera
        <br />
        <br />
        <Button variant="primary" type="submit">
          Zarejestruj się
        </Button>
      </Form>
    </Container>
  );
}
