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
    /*if (pwRegex.test(password)) {
      var response = await fetch("/signup", {
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
      else {
        var data = response.json();
        console.log(data);
        alert(response);
      }
    } else {
      alert("The password does not meet the requirements");
    }*/
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
        Password length 6 - 10, 1 digit, 1 lowercase, 1 uppercase
        <br />
        <br />
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
}
