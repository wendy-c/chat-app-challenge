import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';
import { loadData, addMessage } from './store'

const GroupContainer = styled.h3`text-align: center;`;

const PostContainer = styled.div`
  position: absolute;
  bottom: 0;
  
`;

const Input = styled.input`
  width: 30%;
`;

const SendBtn = styled.span`
  background-color: #430082;
  color: #fff;
  padding: 0.3em;
  border-radius: 10px;
`;

const mapStateToProps = state => ({
  messages: state.messages,
  sentinel: state.sentinel,
  isTyping: state.isTyping,
  typingUsers: state.typingUsers
})

const mapDispatchToProps = dispatch => ({
  addMessage: payload => dispatch(addMessage(payload)),
  loadData: payload => dispatch(loadData(payload))
});

class Convo extends Component {
  state = {
    input: ""
  }

  handleChange = event => {
    const {activeUsername, isTyping, typingUsers} = this.props;
    let newTypingUsers = isTyping ? [...typingUsers, ...[activeUsername]] : [activeUsername];

    this.setState({input: event.target.value});

    this.props.loadData({
        isTyping: true,
        typingUsers: newTypingUsers
    })
  }

  handleClick = event => {
    const {messages, chatId, activeUsername, typingUsers, isTyping, sentinel} = this.props;
    const currentChat = messages[chatId - 1];
    const timestamp = moment().format();
    const newTypingUsers = typingUsers.length === 1 ? [] : typingUsers.filter(user => user !== activeUsername);


    const newMessage = {
      sendFrom: activeUsername,
      text: this.state.input,
      time: timestamp
    }
    this.setState({input: ""});

    this.props.addMessage({
      chatId: chatId,
      newMessage
    })

    this.props.loadData({
      sentinel: !sentinel,
      isTyping: Boolean(typingUsers.length),
      typingUsers: newTypingUsers
    })

  }

  render() {
    const { chatId, usersInChat, activeUsername, messages, isTyping, typingUsers } = this.props;
    const recipient = usersInChat.filter(user => user !== activeUsername);
    const upperInitial = recipient[0][0].toUpperCase();
    const content = messages[chatId - 1].messages;
    const anyoneTyping = isTyping && typingUsers.includes(recipient[0]);

    return (
      <div>
        <GroupContainer>{`${upperInitial}${recipient[0].slice(1)}`}</GroupContainer>
        <div>
          {content.map(message => {
            return <div key={message.text}>{message.text}</div>;
          })}
        </div>
        <PostContainer>
        {anyoneTyping && <div>Someone is typing...</div>}
        <Input type="text" row="5" name="message" value={this.state.input} onChange={this.handleChange} />
        <SendBtn type="submit" onClick={this.handleClick}>Send</SendBtn>
        </PostContainer>
      </div>
    );    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Convo);