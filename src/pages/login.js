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
    await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });
    Router.push("/");
  }

  return (
    <Container>
      <Form onSubmit={submit}>
        <Form.Label>Login</Form.Label>
        <Form.Control
          type="text"
          placeholder="username"
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
        <Form.Control
          type="passoword"
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
}
