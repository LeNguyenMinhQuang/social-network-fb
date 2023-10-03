import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import { Home, Message, Person } from "@mui/icons-material";

const Wrapper = styled.div`
  z-index: 2;
  display: flex;
  padding-bottom: 16px;
  justify-content: space-around;
  width: 100%;

  @media (min-width: 900px) {
    display: none;
  }

  .panel {
    width: 48px;
    height: 48px;
    background-color: var(--blue);
    border-radius: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    box-shadow: var(--boxShadow1);
    cursor: pointer;

    &:hover {
      animation: jump 0.4s;
    }
  }
`;

function Menu() {
  return (
    <Wrapper>
      <Link to="/" className="panel home">
        <Home />
      </Link>
      <Link to="/message" className="panel message">
        <Message />
      </Link>
      <Link to={`/user/${localStorage["userId"]}`} className="panel person">
        <Person />
      </Link>
    </Wrapper>
  );
}

export default Menu;
