import Form from "react-bootstrap/Form";
import Router from "next/router";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
const { useState } = require("react");

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  async function submit(event) {
    event.preventDefault();
    await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password,
        email
      })
    });
    Router.push("/");
  }

  return (
    <Container>
      <Form onSubmit={submit}>
        <Form.Label>Register</Form.Label>
        <Form.Control
          type="text"
          placeholder="username"
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
        <Form.Control
          type="email"
          placeholder="email"
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
        <Form.Control
          type="password"
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
}
