import React, { useEffect, useState, useContext, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { debounce } from "lodash";

import { AuthContext } from "../../context/AuthContext";
import Menu from "../Page/Menu";

import styled from "styled-components";
import { Grid } from "@mui/material";
import { Home, Message, Person, Logout } from "@mui/icons-material";

import Logo from "../../assets/img/logo-round.png";
import userimg from "../../assets/img/user.jpg";

const Wrapper = styled.div`
  height: 56px;
  background-color: var(--bgColor2);
  box-shadow: var(--boxShadow2);
  padding-inline: 24px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  animation: slideDown 1.5s;

  .left {
    display: flex;
    align-items: center;
    height: 56px;

    & > a {
      height: 40px;
    }

    img {
      height: 40px;
      margin-right: 12px;
      cursor: pointer;
    }

    input {
      height: 40px;
      width: 100%;
      min-width: 150px;
      border-radius: 20px;
      border: none;
      outline: none;
      transition: 0;
      padding-inline: 16px;
      filter: brightness(0.96);
      font-weight: 300;
    }
  }

  .center {
    display: flex;
    height: 56px;
    justify-content: center;
    align-items: center;

    @media (max-width: 900px) {
      display: none;
    }

    .button {
      width: 80%;
      height: 80%;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      color: var(--gray);
      cursor: pointer;

      &:hover {
        background-color: var(--bgColor1);
      }

      &::after {
        content: "";
        position: absolute;
        bottom: -6px;
        width: 100%;
        border-bottom: 3px solid var(--blue);
        transform: scaleX(0);
        transition: 0.2;
      }

      .icon {
        font-size: 24px;
      }
    }

    .active {
      color: var(--blue) !important;

      &::after {
        transform: scaleX(1);
      }
    }
  }

  .right {
    height: 56px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .active {
      background-color: var(--bgColor1);
    }

    .box {
      width: 30%;
      border-radius: 24px;
      height: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      position: relative;

      &:hover {
        background-color: var(--bgColor1);
      }

      p {
        font-size: 14px;
        font-weight: 500;
      }

      .avatar {
        height: 28px;
        width: 28px;
        border-radius: 50%;
        margin-right: 8px;
        object-fit: cover;
        object-position: center;
      }
    }
  }
`;

const ModalWrapper = styled.div`
  width: 400px;
  background-color: var(--bgColor2);
  box-shadow: var(--boxShadow1);
  border-radius: 8px;
  position: absolute;
  bottom: -182px;
  right: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 24px;
  animation: slideToLeft 0.5s ease-out;

  @media (min-width: 900px) {
    bottom: -122px;
  }

  .button {
    width: 100%;
    display: flex;
    padding-block: 12px 8px;
    flex-direction: row;
    align-items: center;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;

    &:hover {
      background-color: var(--bgColor1);
    }

    .circle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: var(--bgColor1);
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 12px;
    }
  }
`;

const SearchWrapper = styled.div`
  width: 300px;
  background-color: var(--bgColor2);
  box-shadow: var(--boxShadow1);
  border-radius: 8px;
  position: absolute;
  top: 60px;
  left: 72px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 24px;
  animation: slideToRight 0.5s ease-out;

  .user {
    width: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 8px 16px;
    border-radius: 6px;
    text-decoration: none;

    &:hover {
      background-color: rgba(0, 0, 0, 0.07);
    }

    img {
      height: 40px;
      width: 40px;
      border-radius: 20px;
    }
  }
`;

function Modal() {
  const { dispatch } = useContext(AuthContext);
  const handleLogOut = async () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    dispatch({ type: "CLEAR_AUTH", payload: null });
  };
  return (
    <ModalWrapper>
      <Menu />
      <div
        onClick={() => {
          handleLogOut();
        }}
        className="button"
      >
        <div className="circle">
          <Logout />
        </div>
        <p>Log Out</p>
      </div>
    </ModalWrapper>
  );
}

function SearchModal({ data }) {
  return (
    <SearchWrapper>
      {data.length === 0 ? (
        <p>No User Found</p>
      ) : (
        data.map((user) => (
          <Link to={`/user/${user._id}`} className="user" key={user._id}>
            <img src={user.photoUrl || userimg} alt="avatar" />
            <p
              className="name"
              style={{ textDecoration: "none", color: "rgba(0,0,0,0.7)" }}
            >
              {user.username}
            </p>
          </Link>
        ))
      )}
    </SearchWrapper>
  );
}

function Header() {
  // Context
  const {
    authState: { user },
    getUserList,
  } = useContext(AuthContext);

  // State
  const [modalShow, setModalShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchList, setSearchList] = useState([]);

  // location
  const location = useLocation();
  const [active, setActive] = useState("home");
  useEffect(() => {
    if (location.pathname.includes("/message")) {
      setActive("message");
    } else if (location.pathname.includes("/user")) {
      setActive("user");
    } else {
      setActive("home");
    }
  }, [location.pathname]);

  // Query
  const handleSearch = useCallback(
    (payload) => {
      const run = async (payload) => {
        const response = await getUserList();
        const userList = response.allUser;

        const tempSearch = userList.filter((user) =>
          user.username.includes(payload)
        );
        if (tempSearch.length === userList.length) {
          setSearchList([]);
        } else {
          setSearchList(tempSearch.splice(0, 4));
        }
      };
      run(payload);
    },
    [getUserList]
  );

  // const debounceSearch = debounce((payload) => handleSearch(payload), 1000)
  const debounceSearch = debounce((payload) => handleSearch(payload), 1000);

  const handleChangeInputValue = (payload) => {
    setInputValue(payload);
    debounceSearch(payload);
  };

  return (
    <Wrapper>
      <Grid container>
        <Grid item lg={3} md={3} sm={6} xs={6} className="left">
          <Link to="/">
            <img src={Logo} alt="facebook" />
          </Link>
          <input
            placeholder="Search"
            value={inputValue}
            onChange={(e) => handleChangeInputValue(e.target.value)}
          />
          {inputValue !== "" && <SearchModal data={searchList} />}
        </Grid>
        <Grid item lg={6} md={6} className="center">
          <Link
            to="/"
            className={active === "home" ? "button active" : "button"}
          >
            <Home className="icon" />
          </Link>
          <Link
            to="/message"
            className={active === "message" ? "button active" : "button"}
          >
            <Message className="icon" style={{ fontSize: "22px" }} />
          </Link>
          <Link
            to={`/user/${user?._id}`}
            className={active === "user" ? "button active" : "button"}
          >
            <Person className="icon" />
          </Link>
        </Grid>
        <Grid item lg={3} md={3} sm={6} xs={6} className="right">
          {user && (
            <div
              className={modalShow ? "box active" : "box"}
              onClick={() => {
                setModalShow(!modalShow);
              }}
            >
              <img
                src={user?.photoUrl || userimg}
                alt="avatar"
                className="avatar"
              />
              <p>{user?.username}</p>
              {modalShow && <Modal />}
            </div>
          )}
        </Grid>
      </Grid>
    </Wrapper>
  );
}

export default Header;
