import React, { useEffect, useState, useContext, useCallback } from "react";

import Elements from "../Messenger/Elements";
import { ChatContext } from "../../context/ChatContext";

import styled from "styled-components";

const Wrapper = styled.div`
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }

  .messenger {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 24px;
  }

  .chatbtn {
    width: 100%;
    padding: 8px 8px;
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: 8px;
    color: rgba(0, 0, 0, 0.7);
    animation: slideToLeft 0.8s;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    img {
      height: 80px;
      width: 80px;
      object-fit: cover;
      object-position: center;
      border-radius: 50%;
      margin-right: 24px;
    }

    .name {
      font-size: 1.2rem;
      font-weight: 500;
    }

    .message {
      display: inline-block;

      &.new {
        color: var(--blue);
        font-weight: 500;
      }
    }

    .time {
      font-weight: 300;
      margin-left: 12px;
      display: inline-block;
      font-size: 0.7rem;
      opacity: 0.6;
    }

    .circle {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: var(--blue);
      margin-left: auto;
      display: none;

      &.new {
        display: block;
      }
    }
  }
`;
function Messenger() {
  // Context
  const { getAllChat } = useContext(ChatContext);
  // State chat list
  const [chatList, setChatList] = useState([]);
  // Get chat list

  const getChatList = useCallback(() => {
    const run = async () => {
      const response = await getAllChat();
      if (response.success) {
        setChatList(response.chatList);
      }
    };
    run();
  }, [getAllChat]);

  useEffect(() => {
    getChatList();
  }, [getChatList]);

  return (
    <Wrapper>
      <p className="messenger">Messenger</p>
      {chatList.map((chatbox) => {
        return <Elements key={chatbox._id} data={chatbox} />;
      })}
    </Wrapper>
  );
}

export default Messenger;
