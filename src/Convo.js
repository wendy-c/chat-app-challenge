import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import styled from "styled-components";
import { loadData, addMessage } from "./store";
import Message from "./Message";

const Container = styled.div`
  display: flex; 
  justify-content: flex-start; 
  flex-direction: column;
`;

const GroupContainer = styled.div`
  background-color: #efefef;
  font-size: 1em;
  padding: 0.5em;
  flex-grow: 0;
  flex-shrink: 0;
`;

const MessageContainer = styled.div`
  height: 73vh;
  overflow: scroll;
`;

const SmallText = styled.span`
  font-size: 0.8em;
  padding-right: 0.2em;
`;

const InputContainer = styled.div`
 display: flex;
 width: 100%;
`;

const Input = styled.input`
  height: 1rem;
  width: 100%;
`;

const SendBtn = styled.span`
  background-color: ${props => props.color};
  color: #fff;
  padding: 0.1em;
`;

const TypingBubble = styled.span`
  margin: 0.2em;
  color: #fff;
  background-color: #8f8f8f;
  font-size: 1.5em;
  padding: 0 0.3em;
  border-radius: 25px;
  width: 1.7rem;
  visibility: ${props => props.visibility};
`;

const mapStateToProps = state => ({
  messages: state.messages,
  sentinel: state.sentinel,
  isTyping: state.isTyping,
  typingUsers: state.typingUsers
});

const mapDispatchToProps = dispatch => ({
  addMessage: payload => dispatch(addMessage(payload)),
  loadData: payload => dispatch(loadData(payload))
});

class Convo extends Component {
  state = {
    input: ""
  };

  handleChange = event => {
    const { activeUsername, isTyping, typingUsers } = this.props;
    let newTypingUsers = [];
    let stillTyping;

    if (isTyping && event.target.value.length > 0) {
      newTypingUsers = [...typingUsers, ...[activeUsername]];
      stillTyping = true;
    } else if (event.target.value.length === 0) {
      newTypingUsers = typingUsers.filter(user => user !== activeUsername);
      stillTyping = Boolean(newTypingUsers.length);
    } else {
      newTypingUsers = [activeUsername];
      stillTyping = true;
    }

    this.setState({ input: event.target.value });

    this.props.loadData({
      isTyping: stillTyping,
      typingUsers: newTypingUsers
    });
  };

  handleClick = event => {
    if (event.key !== "Enter" && event.target.type === "text") {
      return;
    }
    const {
      chatId,
      activeUsername,
      typingUsers,
      sentinel
    } = this.props;
    const timestamp = moment().format("llll");
    const newTypingUsers =
      typingUsers.length === 1
        ? []
        : typingUsers.filter(user => user !== activeUsername);

    const newMessage = {
      sentFrom: activeUsername,
      text: this.state.input,
      time: timestamp
    };
    this.setState({ input: "" });

    this.props.addMessage({
      chatId: chatId,
      newMessage
    });

    this.props.loadData({
      sentinel: !sentinel,
      isTyping: Boolean(typingUsers.length),
      typingUsers: newTypingUsers
    });
  };

  render() {
    const {
      chatId,
      usersInChat,
      activeUsername,
      messages,
      isTyping,
      typingUsers
    } = this.props;
    const recipient = usersInChat.filter(user => user !== activeUsername);
    const upperInitial = recipient[0][0].toUpperCase();
    const content = messages[chatId - 1].messages;
    const anyoneTyping = isTyping && typingUsers.includes(recipient[0]);
    const typingBubble = anyoneTyping ? "visable" : "hidden";
    return (
      <Container>
        <GroupContainer>
          <SmallText>To:</SmallText>
          {`${upperInitial}${recipient[0].slice(1)}`}
        </GroupContainer>
        <MessageContainer>
          {content.map(message => (
            <Message key={message.text} message={message} activeUsername={activeUsername} />
          ))}
        </MessageContainer>
        <TypingBubble visibility={typingBubble}>&#8226;&#8226;&#8226;</TypingBubble>
        <InputContainer>
          <Input
            type="text"
            name="message"
            value={this.state.input}
            onChange={this.handleChange}
            onKeyPress={this.handleClick}
          />
          <SendBtn type="click" onClick={this.handleClick} color={this.state.input.length > 0 ? "#8f8f8f" : "#efefef"}>
            SEND
          </SendBtn>
        </InputContainer>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Convo);