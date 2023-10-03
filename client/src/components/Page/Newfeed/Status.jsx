import React, { useState, useContext } from "react";

import { PostContext } from "../../../context/PostConetxt";

import { Upload, Check } from "@mui/icons-material";

function Status({ onSetPosts }) {
  // Context
  const { postPost } = useContext(PostContext);
  // State
  const [uploadIcon, setUploadIcon] = useState(false);
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");

  // Post a post

  const handlePostPost = async (text, image) => {
    const uploadData = new FormData();
    // uploadData.append("text", text);
    uploadData.append("file", image);
    uploadData.append("upload_preset", "social_network");
    const response1 = await fetch(
      "https://api.cloudinary.com/v1_1/quangcloud/image/upload",
      {
        method: "post",
        body: uploadData,
      }
    );

    const response2 = await response1.json();
    const photoUrl = response2.url;

    const response = await postPost(text, photoUrl);
    if (response.success) {
      onSetPosts((prev) => [...prev, response.post]);
    }
  };
  return (
    <div className="status">
      <input
        type="text"
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <label
        htmlFor="upload-photo"
        onClick={() => {
          setUploadIcon(!uploadIcon);
        }}
      >
        {!uploadIcon ? <Upload /> : <Check />}
      </label>
      <input
        type="file"
        name="file"
        id="upload-photo"
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />
      <button
        className="button"
        onClick={() => {
          handlePostPost(text, image);
        }}
      >
        Post
      </button>
    </div>
  );
}

export default Status;
