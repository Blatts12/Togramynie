require("dotenv").config();
import React from "react";
import axios from "axios";
import { Row, Col, DropdownButton, Dropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import useSocket from "../../hooks/useSocket";
const { useState } = require("react");

const RoomTitle = styled.h2`
  text-align: center;
  padding: 0.5rem;
`;

const UserTitle = styled.h2`
  text-align: center;
  padding: 0.5rem;
`;

const ValueButton = styled(Button)`
  text-align: center;
  font-size: 1.75rem;
  width: 100%;
  border: none;
  background: none;
  outline: none;
  :focus {
    outline: none;
  }
`;

const Value = styled.h3`
  text-align: center;
  font-size: 1.75rem;
  width: 100%;
`;

const Crementator = styled(Button)`
  padding: 0.65rem;
  width: 100%;
  height: 100%;
  text-align: center;
  border-radius: 0px;
  font-size: 1.2rem;
  outline: none;
  :focus {
    outline: none;
  }
`;

const MaxMin = styled.p`
  padding: 0;
  margin: -0.5rem;
  color: red;
  font-size: 0.725rem;
`;

function Room({ user, room }) {
  const [selectedUser, setSelectedUser] = useState(room.users[0].username);
  const [selectedValue, setSelectedValue] = useState(
    room.users[0].values[0].value_name
  );
  const [roomState, setRoomState] = useState(room);
  const [test, setTest] = useState(0);

  var getNumberOfUser = (room, username) => {
    let i = 0;
    for (let u of room.users) {
      if (u.username == username) return i;
      i++;
    }

    return -1;
  };

  var getUserDataFromRoom = username => {
    for (let u of roomState.users) {
      if (u.username == username) {
        return u;
      }
    }

    return {};
  };

  var userJoined = userData => {
    let newRoomState = roomState;
    newRoomState.users.push(userData);
    setRoomState(newRoomState);
    setTest(test + 1);
  };

  var setValue = (username, value_name, newValue) => {
    let newRoomState = roomState;
    for (let u of newRoomState.users) {
      if (u.username == username) {
        for (let v of u.values) {
          if (v.value_name == value_name) {
            v.value = newValue;
            setRoomState(newRoomState);
            setTest(test + 1);
          }
        }
      }
    }
  };

  const socket = useSocket("updateRoom", data => {
    if (data.room_name == roomState.room_name) {
      setValue(data.username, data.value_name, data.new_value);
    }
  });

  useSocket("joinRoom", data => {
    if (data.room_name == roomState.room_name) {
      userJoined(data.userData);
    }
  });

  var changeValue = (username, value_name, number) => {
    if (value_name === "") return;
    let newRoomState = roomState;
    for (let u of newRoomState.users) {
      if (u.username == username) {
        for (let v of u.values) {
          if (v.value_name == value_name) {
            let newValue = parseInt(v.value) + parseInt(number);
            newValue =
              newValue > parseInt(v.value_max)
                ? parseInt(v.value_max)
                : newValue < parseInt(v.value_min)
                ? parseInt(v.value_min)
                : newValue;
            if (newValue != parseInt(v.value)) {
              v.value = newValue;
              socket.emit("updateRoom", {
                room_name: roomState.room_name,
                value_name: selectedValue,
                username: user.username,
                new_value: newValue
              });
              setRoomState(newRoomState);
              setTest(test + 1);
            }
          }
        }
      }
    }
  };

  return (
    <div>
      <Row style={{ borderBottom: "1px solid white" }}>
        <Col>
          <RoomTitle>Pokój {room.room_name}</RoomTitle>
        </Col>
        <Col>
          <RoomTitle>Gra {room.game_name}</RoomTitle>
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
                {roomState.users.map(u => {
                  return (
                    <Dropdown.Item key={u.username} eventKey={u.username}>
                      {u.username}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
            </Col>
          </Row>
          <Row>
            {getUserDataFromRoom(selectedUser).values.map(v => {
              return (
                <Value key={v.value_name + "select"}>
                  {v.value_name}: {v.value}
                </Value>
              );
            })}
          </Row>
        </Col>

        <Col style={{ borderLeft: "1px solid white" }}>
          <UserTitle>{user.username}</UserTitle>
          <span style={{ visibility: "hidden" }}>{test}</span>
          {getUserDataFromRoom(user.username).values.map(v => {
            return (
              <Row key={v.value_name + "_row"}>
                <ValueButton
                  value={v.value_name}
                  onClick={e => setSelectedValue(e.target.value)}
                  style={
                    selectedValue == v.value_name
                      ? { backgroundColor: "#2C4764" }
                      : { background: "none" }
                  }
                >
                  {v.value_name}: {v.value}
                  <MaxMin>
                    {parseInt(v.value) == parseInt(v.value_max)
                      ? "max"
                      : parseInt(v.value) == parseInt(v.value_min)
                      ? "min"
                      : " "}
                  </MaxMin>
                </ValueButton>
              </Row>
            );
          })}
          <Row style={{ marginTop: "1.45rem" }}>
            {room.incs.map(inc => {
              return (
                <Col key={inc + "+"}>
                  <Crementator
                    onClick={e => {
                      changeValue(user.username, selectedValue, e.target.value);
                    }}
                    value={inc}
                  >
                    {" " + inc}
                  </Crementator>
                </Col>
              );
            })}
          </Row>
          <Row>
            {room.decs.map(dec => {
              return (
                <Col key={dec + "-"}>
                  <Crementator
                    onClick={e => {
                      changeValue(user.username, selectedValue, e.target.value);
                    }}
                    value={dec}
                  >
                    {dec}
                  </Crementator>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

Room.getInitialProps = async ctx => {
  axios.defaults.baseURL = process.env.BASE_URL;
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
      return response.data.room;
    });
  return { room };
};

export default Room;
