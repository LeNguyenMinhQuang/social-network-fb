import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../../context/AuthContext";
import { ChatContext } from "../../../context/ChatContext";

import { PersonAdd } from "@mui/icons-material";

import userImg from "../../../assets/img/user.jpg";

function Elements({ user, getAllUser }) {
  const [show, setShow] = useState(true);
  const { addUsertoListFriend } = useContext(AuthContext);
  const { createNewChat } = useContext(ChatContext);

  const addFriend = async (id) => {
    const response = await addUsertoListFriend(id);
    if (response.success) {
      await createNewChat(id);
    }
  };
  return (
    <div className="guest" style={{ display: show ? "flex" : "none" }}>
      <Link to={`/user/${user._id}`} className="start">
        <img src={user.photoUrl || userImg} alt="avatar" />
        <p className="name">{user.username || "name"}</p>
      </Link>

      <PersonAdd
        className="button"
        onClick={() => {
          addFriend(user._id);
          setShow(false);
        }}
      />
    </div>
  );
}

export default Elements;
