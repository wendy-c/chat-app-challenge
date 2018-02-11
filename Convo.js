import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const GroupContainer = styled.h3`text-align: center;`;

const mapDispatchToProps = dispatch => ({});

const Convo = ({ chatId, content, usersInChat, activeUsername }) => {
  const recipient = usersInChat.filter(user => user !== activeUsername);
  return (
    <div>
      <GroupContainer>{recipient[0]}</GroupContainer>
      <div>
        {content.reverse().map(message => {
          return <div>{message.text}</div>;
        })}
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Convo);