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
  state = {};

  componentWillMount() {
    // pass data into redux store
    this.props.loadData({ users, messages, sentinel: false });
  }

  render() {
    const { users, messages } = this.props;
    if (!users) {
      console.log("loading...");
      return <h1>Loading</h1>;
    }

    return (
      <Container>
        <ChatWindow
          activeUser="1"
          userData={users[1]}
          mostRecent={users[1].chats[0]}
        />
        <ChatWindow
          activeUser="0"
          userData={users[0]}
          mostRecent={users[0].chats[0]}
        />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);