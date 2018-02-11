import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Chats from "./Chats";
import Convo from "./Convo";

const Container = styled.div`
  margin: 0 1px;
  width: 50%;
  height: 100vh;
  border: 1px solid #efefef;
  border-radius: 8px;
`;

const Row = styled.div`display: flex;`;

const RowStyled = styled.div`
  display: flex;
  border-bottom: 1px solid #efefef;
  justify-content: space-between;
  align-items: center;
  padding: 0 1em;
  height: 10vh;
`;

const ChatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  border-right: 1px solid #efefef;
  height: 90vh;
`;

const ConvoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
  height: 90vh;
`;

const Icon = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: #d9f0ff;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  font-size: 1.5em;
  color: #fff;
  margin-left: 0.5em;
`;

const Bullet = styled.span`
  color: #40b46b;
  font-size: 3em;
`;

const SmallText = styled.span`
  font-size: 0.8em;
  padding-right: 1em;
`;

const AbsCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const mapStateToProps = state => ({
  messages: state.messages,
  users: state.users
});

const ChatWindow = ({ activeUser, users, userData, mostRecent, messages }) => {
  const currentChat = messages[mostRecent - 1];
  const upperInitial = userData.name[0].toUpperCase();
  return (
    <Container>
      <RowStyled>
      <h3>Slacker</h3>
      <AbsCenter>
      <Bullet>&#8226;</Bullet> 
      <SmallText>Online</SmallText>
      <h3>{`${upperInitial}${userData.name.slice(1)}`}</h3>
      <Icon>{upperInitial}</Icon>
      </AbsCenter>
      </RowStyled>
      <Row>
      <ChatsContainer>
        {users[activeUser].chats.map(chatId => {
          const convo = messages[chatId - 1];
          return (
            <Chats
              key={chatId}
              activeUsername={userData.name}
              usersInChat={convo.users}
              content={convo.messages[0]}
            />
          );
        })}
      </ChatsContainer>
      <ConvoContainer>
        <Convo
          chatId={mostRecent}
          usersInChat={currentChat.users}
          activeUsername={userData.name}
        />
      </ConvoContainer>
      </Row>
    </Container>
  );
};

export default connect(mapStateToProps)(ChatWindow);