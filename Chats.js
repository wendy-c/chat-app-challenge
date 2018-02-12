import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Container = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #efefef;
`;

const TextContainer = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 70%;
  padding-left: 0.1em;
`;

const ChatTitle = styled.div`
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SmallText = styled.span`
  font-size: 0.6em;
  color: #8f8f8f;
  padding-right: 0.3em;
`;

const Chats = ({ Icon, activeUsername, chatId, usersInChat, content, handleConvoWindowChange }) => {
  const recipient = usersInChat.filter(user => user !== activeUsername);
  const upperInitial = recipient[0][0].toUpperCase();
  const timeago = moment(content.time, "llll").fromNow();
  return (
    <Container onClick={handleConvoWindowChange(chatId, activeUsername)}>
      <div style={{width: "30%"}}><Icon>{upperInitial}</Icon></div>
      <TextContainer>
        <ChatTitle>
        <span>{`${upperInitial}${recipient[0].slice(1)}`}</span>
        <SmallText>{timeago}</SmallText>
        </ChatTitle>
        <div style={{fontSize: "0.7em"}}>{content.text}</div>
      </TextContainer>
    </Container>
  );
};

export default Chats;