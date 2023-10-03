import React, { useContext, useEffect, useState, useCallback } from "react";

import { AuthContext } from "../../context/AuthContext";
import Elements from "./Left/Elements";

import styled from "styled-components";

const Wrapper = styled.div`
  height: calc(100vh - 56px - 48px);
  background-color: var(--bgColor2);
  border-radius: 8px;
  box-shadow: var(--boxShadow1);
  padding: 24px;
  animation: slideToRight 1s;

  @media (max-width: 1200px) {
    display: none;
  }

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
      justify-content: space-between;
      position: relative;
      margin-bottom: 16px;
      cursor: pointer;

      .start {
        display: flex;
        align-items: center;
        flex-grow: 2;
        text-decoration: none;
        color: rgba(0, 0, 0, 0.7);
        font-weight: 500;

        img {
          height: 40px;
          width: 40px;
          border-radius: 20px;
          margin-right: 16px;
          object-fit: cover;
          object-position: center;
        }

        p {
          flex-grow: 2;
        }

        &:hover p {
          color: var(--blue);
          transform: translateX(5px);
        }
      }

      .button {
        &:hover {
          color: var(--blue);
        }
      }
    }
  }
`;

function Left() {
  const [userList, setUserList] = useState([]);
  const {
    authState: { user },
    getUserList,
  } = useContext(AuthContext);

  const getAllUser = useCallback(() => {
    const run = async () => {
      const response = await getUserList();
      if (response.success) {
        const data = response.allUser;
        const temp = data.filter(
          (one) => !user?.friend.includes(one._id) && one._id !== user?._id
        );
        setUserList(temp);
      }
    };
    run();
  }, [getUserList, user]);

  useEffect(() => {
    getAllUser();
  }, [user, getAllUser]);

  return (
    <Wrapper>
      <p className="text">People you may know</p>
      <div className="box">
        {userList.map((user) => {
          return (
            <Elements key={user._id} user={user} getAllUser={getAllUser} />
          );
        })}
      </div>
    </Wrapper>
  );
}

export default Left;
