import React, { useState, useEffect, useContext, useCallback } from "react";

import { AuthContext } from "../../../context/AuthContext";

import styled from "styled-components";

import { format } from "timeago.js";

import userImg from "../../../assets/img/user.jpg";

const Wrapper = styled.div`
  margin-bottom: 16px;

  .commentUser {
    display: flex;

    .avatar {
      height: 32px;
      width: 32px;
      border-radius: 16px;
      margin-right: 16px;
    }

    .commentBox {
      background-color: rgba(0, 0, 0, 0.05);
      border-radius: 6px;
      padding: 4px 12px;
      margin-right: 12px;

      p {
        font-size: 0.8rem;
      }

      .name {
        font-weight: 500;
      }
    }
    .time {
      font-size: 0.6rem;
      color: rgba(0, 0, 0, 0.5);
      align-self: flex-end;
    }
  }
`;

function Comment({ cmt }) {
  // Context
  const { getUser } = useContext(AuthContext);

  // State
  const [user, setUser] = useState(null);

  // Get user
  const handleGetUser = useCallback(
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
    handleGetUser(cmt.userId);
  }, [cmt, handleGetUser]);
  return (
    <Wrapper>
      <div className="commentUser">
        <img src={user?.photoUrl || userImg} alt="avatar" className="avatar" />
        <div className="commentBox">
          <p className="name">{user?.username}</p>
          <p className="text">{cmt.comment}</p>
        </div>
        <p className="time">{format(cmt.createdAt)}</p>
      </div>
    </Wrapper>
  );
}

export default Comment;
