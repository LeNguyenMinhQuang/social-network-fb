import React, { useEffect, useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

import { AuthContext } from "../../context/AuthContext";

import userImg from "../../assets/img/user.jpg";

function Elements({ data }) {
  // Context
  const { getUser } = useContext(AuthContext);
  // State
  const [guest, setGuest] = useState({});
  // get guest Id
  const [user1, user2] = data.members;
  const userId = localStorage["userId"];
  const guestId = user1 === userId ? user2 : user1;

  // get guest information
  const getGuestInfo = useCallback(
    (id) => {
      const run = async (id) => {
        const response = await getUser(id);
        if (response.success) {
          setGuest(response.user);
        }
      };
      run(id);
    },
    [getUser]
  );
  useEffect(() => {
    getGuestInfo(guestId);
  }, [guestId, getGuestInfo]);

  // Newest message
  const [newMess, setNewMess] = useState({});
  useEffect(() => {
    const length = data.messages.length - 1;
    setNewMess(data.messages[length]);
  }, [data]);
  return (
    <Link
      to={`/message/${guestId}`}
      className="chatbtn"
      style={{ textDecoration: "none" }}
    >
      <img src={guest.photoUrl || userImg} alt="avatar" />
      <div className="textbox">
        <p className="name">{guest.username}</p>
        {newMess && (
          <div>
            <p className="message">
              {newMess.senderId === guestId ? `${guest.username}: ` : "You: "}
              {newMess.text}
            </p>
            <p className="time">{format(newMess.sendAt)}</p>
          </div>
        )}
      </div>
      <div className="circle"></div>
    </Link>
  );
}

export default Elements;
