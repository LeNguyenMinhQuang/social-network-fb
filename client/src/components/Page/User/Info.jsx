import React, { useState, useEffect, useContext, useCallback } from "react";
import { Link, useParams } from "react-router-dom";

import { AuthContext } from "../../../context/AuthContext";
import { ChatContext } from "../../../context/ChatContext";

import userImg from "../../../assets/img/user.jpg";
import FriendAvatar from "./FriendAvatar";

function Info() {
  // Context
  const { getUser, updateInfo, addUsertoListFriend } = useContext(AuthContext);

  const { createNewChat } = useContext(ChatContext);

  // State
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);

  // Params
  const { id } = useParams();

  // Get user

  const handleGetUset = useCallback(
    (id) => {
      const run = async (id) => {
        const response = await getUser(id);
        setUser(response.user);
        setLoading(false);
      };

      run(id);
    },
    [getUser]
  );

  useEffect(() => {
    handleGetUset(id);
  }, [id, handleGetUset]);

  // Add friend

  const addFriend = async (id) => {
    const response = await addUsertoListFriend(id);
    if (response.success) {
      await createNewChat(id);
    }
    handleGetUset(id);
  };

  // Upload Image

  const handleUpdateImage = async (userId, image) => {
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

    const response = await updateInfo(userId, photoUrl);
    if (response.success) {
      handleGetUset(userId);
    }
    setImage(null);
  };

  return (
    <>
      {!loading && (
        <div className="info">
          <div>
            <img
              src={user?.photoUrl || userImg}
              alt="avatar"
              className="avatar"
            />
            <div className="bio">
              <p className="name">{user?.username}</p>
              <p className="friendTotal">{user?.friend.length} friend(s)</p>
              <div className="friend">
                {user?.friend.map((friend) => (
                  <FriendAvatar key={friend} userId={friend} />
                ))}
              </div>
            </div>
          </div>
          {user?._id !== localStorage["userId"] ? (
            user?.friend?.includes(localStorage["userId"]) ? (
              <Link
                className="button"
                to={`/message/${user?._id}`}
                style={{ textDecoration: "none" }}
              >
                Send a message
              </Link>
            ) : (
              <button
                className="button"
                onClick={() => {
                  addFriend(user?._id);
                }}
              >
                Add Friend
              </button>
            )
          ) : !image ? (
            <label htmlFor="changeAvatar" className="button">
              Change Avatar
            </label>
          ) : (
            <button
              onClick={() => {
                handleUpdateImage(user?._id, image);
              }}
            >
              Apply
            </button>
          )}

          <input
            type="file"
            className="input"
            id="changeAvatar"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
        </div>
      )}
    </>
  );
}

export default Info;
