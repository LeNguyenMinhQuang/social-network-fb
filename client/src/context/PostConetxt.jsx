import React, { createContext } from "react";

import { apiUrl } from "./constants";
import axios from "axios";

const PostContext = createContext();
const PostProvider = ({ children }) => {
  // Get post of friend and self
  const getPost = async (id) => {
    try {
      const response = await axios.post(`${apiUrl}/post/all`, {
        id: id,
      });
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Post a post
  const postPost = async (text, photoUrl) => {
    try {
      const response = await axios.post(`${apiUrl}/post`, {
        text: text,
        photoUrl: photoUrl,
      });
      console.log(response);
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Like or unlike a post
  const reactPost = async (postId) => {
    try {
      const response = await axios.put(`${apiUrl}/post/reaction`, {
        postId: postId,
      });
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Comment a post
  const commentPost = async (postId, comment) => {
    try {
      const response = await axios.put(`${apiUrl}/post/comment`, {
        postId: postId,
        comment: comment,
      });
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };
  return (
    <PostContext.Provider value={{ getPost, postPost, reactPost, commentPost }}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
