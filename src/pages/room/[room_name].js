require("dotenv").config();
import React from "react";
import Form from "react-bootstrap/Form";
import Router from "next/router";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import io from "socket.io-client";
const { useState } = require("react");

const RoomTitle = styled.h2`
  text-align: center;
`;

const UserTitle = styled.h3`
  text-align: center;
`;

const NaviElement = styled.button`
  width: 100%;
  height: 100%;
  font-size: 2.5rem;
  background: none;
  border: none;
  color: white;
`;

const Value = styled.p`
  text-align: center;
  font-size: 2.5rem;
  width: 100%;
`;

class Room extends React.Component {
  static async getInitialProps(ctx) {
    let props = {};
    if (ctx && ctx.req.user) {
      axios.defaults.baseURL = process.env.BASE_URL;
      await axios
        .post("/api/room", {
          room_name: ctx.query.room_name,
          username: ctx.req.user.username
        })
        .then(response => {
          if (response.data.room.length === 0)
            ctx.res.redirect(process.env.BASE_URL);
          props = { ...props, user: ctx.req.user, room: response.data.room };
        })
        .catch(err => console.log(err));
    }
    return props;
  }

  componentDidMount() {
    this.socket = io();
    this.socket.on("updateRoom", this.handleUpdateRoom);
  }

  getRoomUpdate = () => {};

  updateRoom = e => {
    e.preventDefault;
    this.socket.emit("updateRoom", this.getRoomUpdate);
  };

  render() {
    return (
      <div>
        <Row>
          <Col>
            <RoomTitle>Pokój {this.props.room[0].room_name}</RoomTitle>
          </Col>
        </Row>
        <Row>
          <Col style={{ borderRight: "1px solid white" }}>
            <Row>
              <Col>
                <NaviElement> ← </NaviElement>
              </Col>
              <Col>
                <UserTitle>{this.props.room[0].users[0].username}</UserTitle>
              </Col>
              <Col>
                <NaviElement> → </NaviElement>
              </Col>
            </Row>
            <Row>
              <Value>Value: {this.props.room[0].users[0].value}</Value>
            </Row>
          </Col>
          <Col style={{ borderLeft: "1px solid white" }}>
            <UserTitle>{this.props.user.username}</UserTitle>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Room;
