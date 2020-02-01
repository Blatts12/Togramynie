require("dotenv").config();
import React from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import useSocket from "../../hooks/useSocket";
import { DropdownButton, Dropdown } from "react-bootstrap";
const { useState } = require("react");

const RoomTitle = styled.h2`
  text-align: center;
`;

const UserTitle = styled.h3`
  text-align: center;
`;

const Value = styled.p`
  text-align: center;
  font-size: 2.5rem;
  width: 100%;
`;

function Room({ user, room }) {
  //const [room_name, setRoomName] = useState("");
  //const [password, setPassword] = useState("");
  //const [game_name, setGameName] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const socket = useSocket("updateRoom", data => {});

  return (
    <div>
      <Row>
        <Col>
          <RoomTitle>Pokój {room.room_name}</RoomTitle>
        </Col>
      </Row>
      <Row>
        <Col style={{ borderRight: "1px solid white" }}>
          <Row>
            <Col>
              <DropdownButton
                title={selectedUser === "" ? "Lista graczy" : selectedUser}
                variant="block"
                onSelect={key => {
                  setSelectedUser(key);
                }}
              >
                {room.users.map(user => {
                  return (
                    <Dropdown.Item key={user.username} eventKey={user.username}>
                      {user.username}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
            </Col>
          </Row>
          <Row>
            <Value>Value: {"temp"}</Value>
          </Row>
        </Col>
        <Col style={{ borderLeft: "1px solid white" }}>
          <UserTitle>{user.username}</UserTitle>
        </Col>
      </Row>
    </div>
  );
}

Room.getInitialProps = async ctx => {
  axios.defaults.baseURL = process.env.BASE_URL;
  //if (ctx)
  var room = await axios
    .post("/api/room", {
      room_name: ctx.query.room_name,
      username: ctx.req.user.username
    })
    .then(response => {
      if (response.data.room.length === 0) {
        ctx.res.redirect(process.env.BASE_URL);
        return {};
      }
      return response.data.room[0];
    });

  return { room };
};

export default Room;
