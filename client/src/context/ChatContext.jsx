import axios from "axios";
import React, { createContext } from "react";

import { apiUrl } from "./constants";

const ChatContext = createContext();
const ChatProvider = ({ children }) => {
  // Create a new chatbox
  const createNewChat = async (id) => {
    try {
      await axios.post(`${apiUrl}/chatbox`, {
        guestId: id,
      });
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Get chat box of user vs another
  const getChat = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/chatbox/${id}`);
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Send message
  const sendMess = async (text, id) => {
    try {
      const response = await axios.post(
        `${apiUrl}/chatbox/message/send/${id}`,
        {
          text: text,
        }
      );
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Get all chat of an user

  const getAllChat = async () => {
    try {
      const response = await axios.get(`${apiUrl}/chatbox/message`);
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  return (
    <ChatContext.Provider
      value={{ createNewChat, getChat, sendMess, getAllChat }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
