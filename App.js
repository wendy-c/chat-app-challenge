import React, { Component } from 'react';
import styled from "styled-components";
import './ChatWindow';

class App extends Component {

  render() {
    return (
      <div>
        <ChatWindow user="Laura"/> 
        <ChatWindow user="Rob"/> 
      </div>
    );
  }
}

export default App;
