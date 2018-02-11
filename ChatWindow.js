import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Chats from "./Chats";
import Convo from "./Convo";

const Container = styled.div`
  display: flex;
  margin: 0 1px;
  width: 50%;
  height: 100vh;
  border: 1px solid #efefef;
  border-radius: 8px;
`;

const Column = styled.div`height: 100vh;`;

const ChatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  border-right: 1px solid #efefef;
`;

const ConvoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
`;

const mapStateToProps = state => ({
  messages: state.messages,
  users: state.users
});

const ChatWindow = ({ activeUser, users, userData, mostRecent, messages }) => {
  const currentChat = messages[mostRecent - 1];

  return (
    <div>
      <div />
      <Container>
        <ChatsContainer>
          {users[activeUser].chats.map(chatId => {
            const convo = messages[chatId - 1];
            return (
              <Chats
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
            content={currentChat.messages}
            usersInChat={currentChat.users}
            activeUsername={activeUser}
          />
        </ConvoContainer>
      </Container>
    </div>
  );
};

export default connect(mapStateToProps)(ChatWindow);