import React, { useState, useEffect, useContext, useCallback } from "react";

import userImg from "../../../assets/img/user.jpg";

import { Link } from "react-router-dom";

import { AuthContext } from "../../../context/AuthContext";

function Elements({ guestId }) {
  const [guest, setGuest] = useState({});
  const { getUser } = useContext(AuthContext);

  // Get user information
  const getUserInfo = useCallback(
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
    getUserInfo(guestId);
  }, [guestId, getUserInfo]);

  return (
    <Link
      to={`/message/${guestId}`}
      className="guest"
      style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.7)" }}
    >
      <div className="start">
        <img src={guest.photoUrl || userImg} alt="avatar" />
        <p className="name">{guest.username}</p>
      </div>
      <div className="active"></div>
      <div></div>
    </Link>
  );
}

export default Elements;
