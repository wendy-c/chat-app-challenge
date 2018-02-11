import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 4rem;
  border-bottom: 1px solid #efefef;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Chats = ({ activeUsername, usersInChat, content }) => {
  const recipient = usersInChat.filter(user => user !== activeUsername);
  return (
    <Container>
      <div>{recipient[0]}</div>
      <div>{content.text}</div>
    </Container>
  );
};

export default Chats;