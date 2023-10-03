import React, { useContext, useEffect, useState } from "react";

import { SocketContext } from "../../context/SocketContext";
import { AuthContext } from "../../context/AuthContext";

import Elements from "./Right/Elements";

import styled from "styled-components";

const Wrapper = styled.div`
  height: calc(100vh - 56px - 48px);
  background-color: var(--bgColor2);
  border-radius: 8px;
  box-shadow: var(--boxShadow1);
  padding: 24px;
  animation: slideToLeft 1s;

  .text {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 8px;
  }

  .box {
    overflow-y: scroll;
    height: calc(100vh - 56px - 48px - 24px - 74px);
    padding: 16px 0;

    &::-webkit-scrollbar {
      display: none;
    }

    .guest {
      display: flex;
      align-items: center;
      position: relative;
      margin-bottom: 16px;

      .start {
        display: flex;
        align-items: center;

        img {
          height: 40px;
          width: 40px;
          border-radius: 20px;
          margin-right: 16px;
          object-fit: cover;
          object-position: center;
        }
      }

      &:hover p {
        color: var(--blue);
        transform: translateX(5px);
      }

      .active {
        background-color: green;
        height: 10px;
        width: 10px;
        border-radius: 50%;
        position: absolute;
        top: 30px;
        left: 30px;
      }
    }
  }

  @media (max-width: 1200px) {
    display: none;
  }
`;

function Right() {
  const [userOnline, setUserOnline] = useState([]);
  const {
    authState: { user },
  } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (user) {
      socket.current?.on("getUsers", (users) => {
        let userTemp = users.filter((userT) =>
          user.friend.includes(userT.userId)
        );
        setUserOnline(userTemp);
      });
    }
  }, [socket, user]);

  return (
    <Wrapper>
      <p className="text">Online Friend</p>
      <div className="box">
        {userOnline?.map((user) => {
          return <Elements key={user?.userId} guestId={user?.userId} />;
        })}
      </div>
    </Wrapper>
  );
}

export default Right;
