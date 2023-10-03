import React, { useState, useEffect, useContext, useCallback } from "react";

import { AuthContext } from "../../../context/AuthContext";

import styled from "styled-components";

import userImg from "../../../assets/img/user.jpg";
import { Link } from "react-router-dom";

const Wrapper = styled.div``;

function FriendAvatar({ userId }) {
  // Context
  const { getUser } = useContext(AuthContext);
  // State
  const [user, setUser] = useState({});
  // Get user
  const handleGetUset = useCallback(
    (id) => {
      const run = async (id) => {
        const response = await getUser(id);
        setUser(response.user);
      };
      run(id);
    },
    [getUser]
  );
  useEffect(() => {
    handleGetUset(userId);
  }, [userId, handleGetUset]);

  return (
    <Wrapper>
      <Link to={`/user/${user?._id}`}>
        <img
          className="friendAvatar"
          src={user?.photoUrl || userImg}
          alt="friend"
        />
      </Link>
      <p className="friendName">{user?.username}</p>
    </Wrapper>
  );
}

export default FriendAvatar;
