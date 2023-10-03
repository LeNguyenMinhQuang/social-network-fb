import React, { useState, useRef, useEffect, useContext } from "react";

import { AuthContext } from "../../context/AuthContext";
import Alert from "./Alert";

import styled from "styled-components";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/img/logo.svg";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bgColor1);
  position: relative;
  overflow: hidden;

  .container {
    margin-top: -100px;

    .img_text {
      padding-top: 80px;
      height: 320px;

      .img {
        margin: -28px;
      }

      .text {
        @media (min-width: 1200px) {
          font-size: 24px;
        }
        @media (max-width: 1199px) {
          font-size: 20px;
        }
      }

      @media (max-width: 900px) {
        height: auto;
        padding-top: 0;
        text-align: center;

        .text {
          width: 380px;
          margin-inline: auto;
          margin-bottom: 40px;
        }
      }
    }

    .modal {
      background-color: var(--bgColor2);
      height: 320px;
      width: 100%;
      border-radius: 8px;
      box-shadow: var(--boxShadow1);
      padding: 24px;

      @media (max-width: 900px) {
        width: 400px;
        margin-inline: auto;
      }

      input {
        font-size: 16px;
        border: 1px solid #dddfe2;
        outline: none;
        border-radius: 6px;
        height: 48px;
        width: 100%;
        margin-bottom: 12px;
        padding-inline: 16px;
        transition: 0s;

        &:focus,
        &:active {
          border: none;
          outline: none;
        }
      }

      .login {
        cursor: pointer;
        border: none;
        border-radius: 6px;
        background-color: var(--blue);
        width: 100%;
        height: 48px;
        font-size: 20px;
        font-weight: 600;
        color: var(--bgColor2);
        margin-bottom: 8px;

        &:hover {
          filter: brightness(0.9);
        }
      }

      .forget {
        font-size: 12px;
        text-align: center;
        cursor: pointer;
        margin-bottom: 12px;

        &:hover {
          color: var(--blue);
        }
      }

      .slash {
        border-bottom: 1px solid #dadde1;
        margin-bottom: 16px;
      }

      .register {
        margin-inline: auto;
        display: block;
        cursor: pointer;
        border: none;
        border-radius: 6px;
        background-color: var(--green);
        padding-inline: 16px;
        height: 48px;
        font-size: 16px;
        font-weight: 600;
        color: var(--bgColor2);

        &:hover {
          filter: brightness(0.9);
        }
      }
    }
  }
`;

function Login() {
  //Navigate
  const navigate = useNavigate();

  // Alert
  const [alert, setAlert] = useState(null);
  // Switch Login modal and Register modal
  const loginRef = useRef(null);
  const registerRef = useRef(null);
  const myF = () => {
    loginRef.current.classList.add("scale0");
    setTimeout(() => {
      loginRef.current.classList.add("hidden");
      registerRef.current.classList.remove("hidden");
    }, 400);
    setTimeout(() => {
      registerRef.current.classList.remove("scale0");
    }, 600);
  };
  const myF2 = () => {
    registerRef.current.classList.add("scale0");
    setTimeout(() => {
      registerRef.current.classList.add("hidden");
      loginRef.current.classList.remove("hidden");
    }, 400);
    setTimeout(() => {
      loginRef.current.classList.remove("scale0");
    }, 600);
  };
  // Context
  const {
    authState: { isAuthenticated },
    loginUser,
    registerUser,
  } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  // Handle register form
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    repassword: "",
  });

  const handleChangeRegister = (name, value) => {
    setRegisterForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  //   Handle login form
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const handleChangeLogin = (name, value) => {
    setLoginForm((prev) => {
      return { ...prev, [name]: value };
    });
  };
  // Function

  const login = async () => {
    try {
      const loginData = await loginUser(loginForm);
      if (loginData.success) {
        navigate("/");
      } else {
        setAlert({ message: loginData.message });
        setTimeout(() => {
          setAlert(null);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setAlert({ message: error.message });
    }
  };

  const register = async () => {
    if (registerForm.password !== registerForm.repassword) {
      setAlert({ message: "Password do not match!" });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
      return;
    }
    try {
      const registerData = await registerUser(registerForm);
      if (registerData.success) {
        navigate("/");
      } else {
        setAlert({ message: registerData.message });
        setTimeout(() => {
          setAlert(null);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <Alert alert={alert} />
      <Grid container className="container">
        <Grid item lg={2} md={1} xs={0}></Grid>
        <Grid className="img_text" item lg={4} md={5} xs={12}>
          <img className="img" src={logo} height="106px" alt="facebook" />
          <p className="text">
            Facebook helps you connect and share with the people in your life.
          </p>
        </Grid>
        <Grid item lg={1} md={1} xs={0}></Grid>
        <Grid item lg={3} md={4} xs={12}>
          <div ref={loginRef} className="modal">
            <input
              type="text"
              placeholder="Username"
              value={loginForm.username}
              name="username"
              onChange={(e) => handleChangeLogin(e.target.name, e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginForm.password}
              name="password"
              onChange={(e) => handleChangeLogin(e.target.name, e.target.value)}
            />
            <button
              className="login"
              type="submit"
              onClick={() => {
                login();
              }}
            >
              Log In
            </button>
            <p className="forget">Forgotten password?</p>
            <div className="slash"></div>
            <button
              className="register"
              onClick={() => {
                myF();
              }}
            >
              Create New Account
            </button>
          </div>
          <div ref={registerRef} className="modal scale0 hidden">
            <input
              type="text"
              placeholder="Username"
              value={registerForm.username}
              name="username"
              onChange={(e) => {
                handleChangeRegister(e.target.name, e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={registerForm.password}
              name="password"
              onChange={(e) => {
                handleChangeRegister(e.target.name, e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={registerForm.repassword}
              name="repassword"
              onChange={(e) => {
                handleChangeRegister(e.target.name, e.target.value);
              }}
            />
            <button
              className="login"
              type="submit"
              onClick={() => {
                register();
              }}
            >
              Register
            </button>
            <p
              className="forget"
              onClick={() => {
                myF2();
              }}
            >
              Already have an account?
            </p>
          </div>
        </Grid>
        <Grid item lg={2} md={1} xs={0}></Grid>
      </Grid>
    </Wrapper>
  );
}

export default Login;
