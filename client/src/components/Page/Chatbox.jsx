import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  useCallback,
} from "react";
import { useParams } from "react-router-dom";

import { SocketContext } from "../../context/SocketContext";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import Message from "../Messenger/Message";

import styled from "styled-components";

import userImg from "../../assets/img/user.jpg";

const Wrapper = styled.div`
  .info {
    display: flex;
    align-items: center;
    box-shadow: var(--boxShadow1);
    padding: 12px 16px;
    margin-bottom: 24px;
    border-radius: 6px;
    animation: slideUp 1s;

    .avatar {
      height: 40px;
      width: 40px;
      object-fit: cover;
      object-position: center;
      border-radius: 50%;
      margin-right: 12px;
    }

    .name {
      font-size: 1.2rem;
    }
  }

  .chatbox {
    height: calc(100vh - 56px - 136px - 64px - 72px);
    box-shadow: var(--boxShadow1);
    border-radius: 6px;
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    margin-bottom: 24px;
    animation: slideUp 1.2s;

    @media (max-width: 900px) {
      height: calc(100vh - 56px - 136px - 64px - 24px);
    }

    &::-webkit-scrollbar {
      display: none;
    }

    .chattext {
      margin-bottom: 2px;
      display: flex;
      align-self: flex-start;
      flex-direction: column;
      flex-grow: 0;
      animation: Popup 0.2s ease;

      p {
        background-color: rgba(0, 0, 0, 0.1);
        padding: 4px 16px;
        max-width: 400px;
        display: block;
        border-radius: 17px;
        min-width: 150px;
        overflow-x: hidden;
        white-space: pre-wrap;
        word-break: break-word;
      }

      &.user {
        align-self: flex-end;
        flex-direction: column;

        p {
          background-color: var(--blue);
          color: white;
        }
      }

      .time {
        background-color: transparent !important;
        color: rgba(0, 0, 0, 0.3) !important;
        font-size: 0.6rem;
        padding: 0 8px;
        animation: fadeIn 0.3s ease;
      }
    }
  }

  .chatinput {
    padding: 12px 24px;
    box-shadow: var(--boxShadow1);
    border-radius: 6px;
    display: flex;
    justify-content: flex-end;
    animation: slideUp 1.5s;

    input {
      border: none;
      height: 40px;
      border-radius: 20px;
      padding-inline: 16px;
      flex-grow: 10;
      filter: brightness(0.96);

      &:focus {
        border: none;
        outline: none;
      }
    }

    button {
      background-color: var(--blue);
      border: none;
      outline: none;
      width: 100px;
      border-radius: 20px;
      margin-left: 12px;
      color: white;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

function Chatbox() {
  // Get guest id from params
  const params = useParams();
  const { id } = params;

  // Context
  const { getChat, sendMess } = useContext(ChatContext);
  const { socket } = useContext(SocketContext);
  const { getUser } = useContext(AuthContext);

  // State
  const [chatData, setChatData] = useState([]);
  const [newMessage, setNewMessage] = useState({});
  const [guest, setGuest] = useState({});
  const [text, setText] = useState("");

  // Socket.io

  useEffect(() => {
    socket.current?.on("getMessage", ({ senderId, text, sendAt }) => {
      setNewMessage({ senderId, text, sendAt });
    });
  }, [socket]);

  useEffect(() => {
    setChatData((prev) => [...prev, newMessage]);
  }, [newMessage]);

  // Get chatbox of user and guest

  const getChatbox = useCallback(
    (id) => {
      const run = async (id) => {
        const response = await getChat(id);
        if (response.success) {
          setChatData(response.chatbox[0].messages);
        }
      };
      run(id);
    },
    [getChat]
  );

  useEffect(() => {
    getChatbox(id);
  }, [id, getChatbox]);

  // Get guest info
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
    getGuestInfo(id);
  }, [id, getGuestInfo]);

  // Send a message

  const sendMessage = async (text, id) => {
    if (text === "") {
      return;
    }

    // socket
    socket.current?.emit("sendMessage", {
      receiverId: id,
      senderId: localStorage["userId"],
      text: text,
    });

    // server

    const response = await sendMess(text, id);
    if (response.success) {
      setChatData(response.messages);
    }

    // reset chat input
    setText("");
  };

  // Scroll to newest message
  const newestMessRef = useRef(null);

  useEffect(() => {
    newestMessRef.current.scrollTo(0, newestMessRef.current.scrollHeight);
  }, [chatData]);

  return (
    <Wrapper>
      <div className="info">
        <img src={guest.photoUrl || userImg} className="avatar" alt="avatar" />
        <p className="name">{guest.username}</p>
      </div>
      {chatData && (
        <div ref={newestMessRef} className="chatbox">
          {chatData.length > 0 &&
            chatData?.map((message, index) => {
              return <Message key={index} message={message} id={id} />;
            })}
        </div>
      )}
      <div className="chatinput">
        <input
          type="text"
          placeholder="Message..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button onClick={() => sendMessage(text, id)}>Send</button>
      </div>
    </Wrapper>
  );
}

export default Chatbox;
