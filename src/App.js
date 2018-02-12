import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import ChatWindow from "./ChatWindow";
import { users, messages } from "./data";
import { loadData } from "./store";

const Container = styled.div`display: flex;`;

const mapStateToProps = state => ({
  users: state.users,
  messages: state.messages
});

const mapDispatchToProps = dispatch => ({
  loadData: payload => dispatch(loadData(payload))
});

class App extends Component {
  state = {
    chat1: users[1].chats[0],
    chat2: users[0].chats[0]
  };

  componentWillMount() {
    // pass data into redux store
    this.props.loadData({ users, messages, sentinel: false });
  }

  handleConvoWindowChange = (chatId, activeUsername) => event => {
    const chatWindow = activeUsername === "laura" ? "chat2" : "chat1";
    this.setState({
      [chatWindow]: chatId
    })
  }

  render() {
    const { users } = this.props;
    if (!users) {
      return <h1>Loading</h1>;
    }

    return (
      <Container>
        <ChatWindow
          activeUser="1"
          userData={users[1]}
          mostRecent={this.state.chat1}
          handleConvoWindowChange={this.handleConvoWindowChange}
        />
        <ChatWindow
          activeUser="0"
          userData={users[0]}
          mostRecent={this.state.chat2}
          handleConvoWindowChange={this.handleConvoWindowChange}
        />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);