import React, {
  useState,
  useEffect,
  useContext,
  memo,
  useCallback,
} from "react";

import { AuthContext } from "../../../context/AuthContext";
import { PostContext } from "../../../context/PostConetxt";
import Comment from "./Comment";

import { format } from "timeago.js";

import { Favorite, FavoriteBorder, Send } from "@mui/icons-material";
import imgUrl from "../../../assets/img/user.jpg";

function Elements({ post }) {
  // Context
  const { getUser } = useContext(AuthContext);
  const { reactPost, commentPost } = useContext(PostContext);

  // State
  const [guest, setGuest] = useState({});
  const [like, setLike] = useState(post.like.length);
  const [liked, setLiked] = useState(
    post.like.includes(localStorage["userId"]) ? true : false
  );
  const [commentList, setCommentList] = useState(post.comments);
  const [comment, setComment] = useState("");

  // Get user of post
  const getPostUser = useCallback(
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
    getPostUser(post.userId);
  }, [post, getPostUser]);

  // Like this post
  const handleLikePost = async (id) => {
    const response = await reactPost(id);
    if (response.success) {
      setLike(response.like);
      setLiked(response.liked);
    }
  };

  // Comment this post
  const handleCommentPost = async (postId, comment) => {
    if (comment === "") {
      return;
    }

    // Server
    const response = await commentPost(postId, comment);
    if (response.success) {
      setCommentList(response.postComments);
      setComment("");
    }
  };
  return (
    <div className="post">
      <div className="info">
        <img src={guest.photoUrl || imgUrl} className="avatar" alt="avatar" />
        <div className="up">
          <p className="name">{guest.username}</p>
          <p className="time">{format(post.createdAt)}</p>
        </div>
      </div>
      <p className="description">{post.text}</p>
      {post.photoUrl && (
        <img className="photo" src={post.photoUrl} alt="avatar" />
      )}
      <div className="reaction">
        <button
          className="like"
          onClick={() => {
            handleLikePost(post._id);
          }}
        >
          {liked ? <Favorite /> : <FavoriteBorder />}
          <div className="likenum">{like}</div>
        </button>
        <input
          className="comment"
          placeholder="Your comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="send"
          onClick={() => {
            handleCommentPost(post._id, comment);
          }}
        >
          <Send />
        </button>
      </div>
      <div className="commentPost">
        <div className="title">Comments</div>
        {commentList.length > 0 ? (
          commentList.map((cmt, index) => <Comment key={index} cmt={cmt} />)
        ) : (
          <p className="noCmt">No Comment</p>
        )}
      </div>
    </div>
  );
}

export default memo(Elements);
