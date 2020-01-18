require("dotenv").config();
import Form from "react-bootstrap/Form";
import Router from "next/router";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
const { useState } = require("react");

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function submit(event) {
    event.preventDefault();
    await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });
    window.location.href = process.env.BASE_URL;
  }

  return (
    <Container>
      <Form onSubmit={submit}>
        <Form.Label>
          <h2>Register</h2>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
        <br />
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
}
