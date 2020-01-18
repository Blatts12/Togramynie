require("dotenv").config();
import Form from "react-bootstrap/Form";
import Router from "next/router";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import passport from "passport";
const { useState } = require("react");

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function submit(event) {
    event.preventDefault();
    var response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });
    if (response.status === 200) window.location.href = process.env.BASE_URL;
    else alert("Incorrect credentials!");
  }

  return (
    <Container>
      <Form onSubmit={submit}>
        <Form.Label>
          <h2>Login</h2>
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
          Login
        </Button>
      </Form>
    </Container>
  );
}
