import axios from "axios";
import React, { useReducer, createContext, useEffect } from "react";

import { authInitState, authReducer } from "../reducer/AuthReducer";
import { apiUrl } from "./constants";
import setHeaderRequest from "../utils/configHeader";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  // Reducer
  const [authState, dispatch] = useReducer(authReducer, authInitState);

  // Check user is logged in
  const checkUserLoggedIn = async () => {
    if (localStorage["userToken"]) {
      setHeaderRequest(localStorage["userToken"]);
    } else {
      console.log("no token in local storage");
    }
    try {
      const response = await axios.get(`${apiUrl}/auth`);

      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: true, user: response.data.user },
        });
        localStorage.setItem("userId", response.data.user._id);
      }
    } catch (error) {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userId");
      console.log(error);
      setHeaderRequest(null);
      dispatch({ type: "CLEAR_AUTH", payload: null });
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  useEffect(() => {
    console.log("authState:", authState);
  }, [authState]);

  // Login

  const loginUser = async (data) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, data);
      console.log("login:", response.data);
      if (response.data.success) {
        localStorage.setItem("userToken", response.data.accessToken);
      }

      await checkUserLoggedIn();
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Register

  const registerUser = async (data) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, data);
      console.log("register:", response.data);
      if (response.data.success) {
        localStorage.setItem("userToken", response.data.accessToken);
      }

      await checkUserLoggedIn();
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Get user from userId

  const getUser = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/auth/user/${id}`);
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Get all User

  const getUserList = async () => {
    try {
      const response = await axios.get(`${apiUrl}/auth/all`);
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Add friend

  const addUsertoListFriend = async (id) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/addfriend`, {
        guestId: id,
      });
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Update info
  const updateInfo = async (userId, photoUrl) => {
    try {
      const response = await axios.put(`${apiUrl}/auth/user/${userId}/update`, {
        photoUrl: photoUrl,
      });
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };
  // Return
  return (
    <AuthContext.Provider
      value={{
        authState,
        loginUser,
        registerUser,
        dispatch,
        getUser,
        getUserList,
        addUsertoListFriend,
        updateInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
