import React, { useContext, useEffect } from "react";

import { AuthContext } from "../../context/AuthContext";
import Header from "../Header/Header";
import Right from "./Right";
import Left from "./Left";

import { Outlet, useNavigate } from "react-router-dom";

import styled from "styled-components";
import { Grid } from "@mui/material";

const Wrapper = styled.div`
  background-color: var(--bgColor1);
  height: 100vh;
  padding: 56px 0;
  padding-bottom: 0;
`;

const ContentWrapper = styled(Grid)`
  .side {
    padding: 24px;

    @media (max-width: 900px) {
      display: none;
    }
  }

  & > .box {
    background-color: var(--bgColor2);
    margin-top: 24px;
    padding: 24px;
    height: calc(100vh - 56px - 48px);
    border-radius: 8px;
    box-shadow: var(--boxShadow1);
    box-sizing: border-box;
    animation: slideUp 0.6s;

    @media (max-width: 900px) {
      margin-top: 0;
      height: calc(100vh - 56px);
      border-radius: 0px;
      box-shadow: none;
    }
  }
`;

function Home() {
  // Context
  const {
    authState: { isAuthenticated },
  } = useContext(AuthContext);

  // navigate
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Wrapper>
      <Header />
      <ContentWrapper container>
        <Grid className="side" item lg={3} md={1.5}>
          <Left />
        </Grid>
        <Grid className="box" item lg={6} md={9} sm={12} xs={12}>
          <Outlet />
        </Grid>
        <Grid className="side" item lg={3} md={1.5}>
          <Right />
        </Grid>
      </ContentWrapper>
    </Wrapper>
  );
}

export default Home;
