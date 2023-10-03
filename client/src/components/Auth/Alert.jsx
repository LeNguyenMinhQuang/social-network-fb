import React, { useRef, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  background-color: var(--bgColor2);
  height: 50px;
  width: 380px;
  border-radius: 8px;
  box-shadow: var(--boxShadow1);
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  bottom: -100px;
  right: 40px;

  @media (max-width: 900px) {
    left: 50%;
    transform: translateX(-50%);
  }
`;
function Alert({ alert }) {
  const alertRef = useRef(null);
  useEffect(() => {
    if (alert) {
      alertRef.current.classList.add("slideUp");
    } else {
      alertRef.current.classList.remove("slideUp");
    }
  }, [alert]);
  return (
    <Wrapper ref={alertRef}>
      <p>{alert && alert.message}</p>
    </Wrapper>
  );
}

export default Alert;
