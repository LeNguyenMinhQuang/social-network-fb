import React, { useRef, createContext, useEffect, useContext } from "react";

import { AuthContext } from "./AuthContext";

import { io } from "socket.io-client";

import { socketURL } from "./constants";

const SocketContext = createContext();

function SocketProvider({ children }) {
  let socket = useRef();
  const {
    authState: { user },
  } = useContext(AuthContext);

  //   const userId = user["_id"];

  //connect to socket.io
  useEffect(() => {
    socket.current = io(socketURL);
    console.log(socket);
  }, []);

  //   add user to socketio
  useEffect(() => {
    if (user) {
      socket.current.emit("addUser", user._id);
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export { SocketContext, SocketProvider };
