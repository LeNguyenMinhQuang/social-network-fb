import React from "react";

import Info from "./User/Info";

import styled from "styled-components";

const Wrapper = styled.div`
  padding: 24px;

  .info {
    display: flex;
    margin-bottom: 60px;
    animation: slideUp 1s;
    justify-content: space-between;

    & > div {
      display: flex;
    }

    .avatar {
      height: 160px;
      width: 160px;
      border-radius: 80px;
      object-fit: cover;
      object-position: center;
      margin-right: 20px;
    }
    .bio {
      align-self: center;

      .name {
        font-size: 1.6rem;
        font-weight: 600;
      }

      .friendTotal {
        font-size: 0.8rem;
        color: rgba(0, 0, 0, 0.5);
        margin-bottom: 4px;
      }
      .friend {
        display: flex;
        position: relative;
        width: 150px;
      }

      .friend .friendAvatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        margin-right: 2px;
        cursor: pointer;
        opacity: 0.5;
      }

      .friend a {
        display: flex;

        &:hover ~ .friendName {
          opacity: 1;
          transform: translateY(0);
        }

        &:hover .friendAvatar {
          transform: scale(1.2);
          transform-origin: top;
          opacity: 1;
        }
      }

      .friendName {
        margin-top: 10px;
        position: absolute;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 0 8px;
        border-radius: 15px;
        opacity: 0;
        cursor: default;
        transform: translateY(-5px);
      }
    }

    button {
      height: 40px;
      align-self: center;
      padding: 0 16px;
      background-color: var(--blue);
      color: white;
      border: none;
      outline: none;
      border-radius: 20px;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
    .button {
      height: 40px;
      padding: 6px 16px;
      align-self: center;
      background-color: var(--blue);
      color: white;
      border: none;
      outline: none;
      border-radius: 20px;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }
    .input {
      display: none;
    }
  }
`;

function User() {
  return (
    <Wrapper>
      <Info />
    </Wrapper>
  );
}

export default User;
