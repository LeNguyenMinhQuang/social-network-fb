import React, {
  useState,
  useContext,
  useEffect,
  lazy,
  Suspense,
  useCallback,
} from "react";

import { AuthContext } from "../../context/AuthContext";
import { PostContext } from "../../context/PostConetxt";
import Status from "./Newfeed/Status";

import styled from "styled-components";

// import Elements from "./Newfeed/Elements";
const Elements = lazy(() => import("./Newfeed/Elements"));

const Wrapper = styled.div`
  .status {
    height: 64px;
    box-shadow: var(--boxShadow2);
    display: flex;
    align-items: center;
    padding-inline: 24px;
    gap: 12px;
    border-radius: 6px;
    margin-bottom: 24px;
    animation: slideUp 1s;

    input[type="text"] {
      height: 40px;
      border: none;
      outline: none;
      background-color: rgba(0, 0, 0, 0.03);
      padding-inline: 16px;
      border-radius: 20px;
      flex-grow: 8;
    }

    label {
      height: 40px;
      width: 40px;
      border-radius: 20px;
      border: 2px solid var(--blue);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    input[type="file"] {
      opacity: 0;
      position: absolute;
      z-index: -1;
    }

    button {
      border: none;
      outline: none;
      background-color: var(--blue);
      height: 40px;
      padding-inline: 24px;
      color: white;
      border-radius: 20px;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }
  }
  .feed {
    width: 100%;
    height: calc(100vh - 56px - 48px - 64px - 72px);
    border-radius: 6px;
    padding-inline: 24px;
    overflow-y: scroll;
    box-shadow: var(--boxShadow2);
    animation: slideUp 1.5s;

    @media (max-width: 900px) {
      height: calc(100vh - 56px - 64px - 72px);
    }

    &::-webkit-scrollbar {
      display: none;
    }

    .post {
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      padding-bottom: 24px;
      margin-top: 24px;
      width: 100%;
    }

    .info {
      display: flex;
      width: 100%;
      margin-bottom: 12px;

      .avatar {
        height: 40px;
        width: 40px;
        margin-right: 16px;
        object-fit: cover;
        object-position: center;
        border-radius: 20px;
      }

      .up {
        .name {
          font-weight: 500;
        }
        .time {
          font-size: 0.7rem;
          opacity: 0.8;
        }
      }
    }
    .description {
      margin-bottom: 4px;
    }

    .photo {
      width: 100%;
      border-radius: 6px;
    }

    .reaction {
      margin-block: 16px 24px;
      display: flex;
      justify-content: space-between;
      width: 100%;

      .like,
      .send {
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        outline: none;
        background-color: var(--pink);
        height: 40px;
        width: 40px;
        border-radius: 50%;
        color: white;
        cursor: pointer;
      }

      .like {
        margin-right: 8px;
        position: relative;
        transform: translateY(-8px) scale(0.8);

        .likenum {
          position: absolute;
          font-size: 0.9rem;
          bottom: -24px;
          color: var(--pink);
        }
      }

      .comment {
        border: none;
        outline: none;
        height: 40px;
        flex-grow: 10;
        background-color: rgba(0, 0, 0, 0.05);
        padding-inline: 16px;
        border-radius: 20px;
        margin-right: 16px;
      }

      .send {
        background-color: var(--blue);
        margin-right: 0;
        &:hover {
          transform: translateY(-5px);
        }
      }
    }
    .commentPost {
      padding: 24px;
      padding-bottom: 12px;
      border-radius: 6px;
      border: 2px solid rgba(0, 0, 0, 0.1);
      position: relative;

      .title {
        content: "Comment";
        z-index: 2;
        position: absolute;
        top: -13px;
        left: 12px;
        background-color: white;
        padding-inline: 12px;
        color: rgba(0, 0, 0, 0.5);
        font-size: 0.9rem;
        cursor: pointer;
      }

      .noCmt {
        text-align: center;
        margin-bottom: 12px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.4);
      }
    }
  }
`;

function Newfeed() {
  // Context
  const {
    authState: { user },
  } = useContext(AuthContext);
  const { getPost } = useContext(PostContext);

  // State
  const [posts, setPosts] = useState([]);

  // Get all post
  const handleGetAllPost = useCallback(
    (id) => {
      const run = async (id) => {
        const response = await getPost(id);
        if (response.success) {
          setPosts((prev) => [...prev, ...response.posts]);
        }
      };
      run(id);
    },
    [getPost]
  );

  useEffect(() => {
    handleGetAllPost(user?._id);
    user?.friend.map((id) => handleGetAllPost(id));
  }, [user, handleGetAllPost]);

  return (
    <Wrapper>
      <Status onSetPosts={setPosts} />
      <div className="feed">
        <Suspense fallback={<div>Loading...</div>}>
          {posts?.reverse().map((post) => (
            <Elements key={post._id} post={post} />
          ))}
        </Suspense>
      </div>
    </Wrapper>
  );
}

export default Newfeed;
