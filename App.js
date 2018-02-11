import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import ChatWindow from "./ChatWindow";
import { users, messages } from "./data";
import { loadData } from "./store";

const Container = styled.div`display: flex;`;

const mapStateToProps = state => ({
  store: state
});

const mapDispatchToProps = dispatch => ({
  loadData: payload => dispatch(loadData(payload))
});

class App extends Component {
  state = {};

  componentWillMount() {
    // pass data into redux store
    this.props.loadData({ users, messages });
  }

  findMostRecent = user => {
    console.log(Object.keys(user.chats)[0]);
    return Object.keys(user.chats)[0];
  };

  render() {
    const { store } = this.props;
    if (Object.keys(store).length === 0) {
      console.log("loading...");
      return <h1>Loading</h1>;
    }

    return (
      <Container>
        <ChatWindow
          activeUser="1"
          userData={store.users[1]}
          mostRecent={store.users[1].chats[1]}
        />
        <ChatWindow
          activeUser="0"
          userData={store.users[0]}
          mostRecent={store.users[0].chats[0]}
        />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);