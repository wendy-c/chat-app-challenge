import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import styled from "styled-components";
import { loadData, addMessage } from "./store";
import Message from "./Message";

const GroupContainer = styled.div`
  background-color: #efefef;
  font-size: 1em;
  padding: 0.5em;
`;

const SmallText = styled.span`
  font-size: 0.8em;
  padding-right: 0.2em;
`;

const PostContainer = styled.div`
  position: absolute;
  bottom: 0;
`;

const InputContainer = styled.div`
 width: 100%;
 display: flex;
`;

const Input = styled.input`
  height: 1rem;
  flex: 5;
`;

const SendBtn = styled.span`
  background-color: ${props => props.color};
  color: #fff;
  padding: 0.1em;
  flex: 1;
`;

const TypingBubble = styled.span`
  color: #fff;
  background-color: #8f8f8f;
  font-size: 1.5em;
  padding: 0 0.3em;
  border-radius: 25px;
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
    console.log("listening", event.target.type);
    if (event.key !== "Enter" && event.target.type === "text") {
      return;
    }
    const {
      messages,
      chatId,
      activeUsername,
      typingUsers,
      isTyping,
      sentinel
    } = this.props;
    const currentChat = messages[chatId - 1];
    const timestamp = moment().format("llll");
    const newTypingUsers =
      typingUsers.length === 1
        ? []
        : typingUsers.filter(user => user !== activeUsername);
    console.log("utc time", timestamp);

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

    return (
      <div>
        <GroupContainer>
          <SmallText>To:</SmallText>
          {`${upperInitial}${recipient[0].slice(1)}`}
        </GroupContainer>
        <div>
          {content.map(message => (
            <Message message={message} activeUsername={activeUsername} />
          ))}
        </div>
        <PostContainer>
          {anyoneTyping && <TypingBubble>&#8226;&#8226;&#8226;</TypingBubble>}
          <InputContainer>
            <Input
              type="text"
              row="5"
              name="message"
              value={this.state.input}
              onChange={this.handleChange}
              onKeyPress={this.handleClick}
            />
            <SendBtn type="click" onClick={this.handleClick} color={this.state.input.length > 0 ? "#8f8f8f" : "#efefef"}>
              SEND
            </SendBtn>
          </InputContainer>
        </PostContainer>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Convo);