import { createStore } from 'redux';

let init = {};

// reducers
const reducer = (state = init, action) => {

  switch (action.type) {
    case 'LOAD_DATA':
      return {
        ...state,
        ...action.payload,
      }
    case 'ADD_MESSAGE':
      let newContentArray = state.messages[action.payload.chatId - 1].messages;
      newContentArray = [...newContentArray, ...[action.payload.newMessage]];
      let updatedMessages = Object.assign(state.messages, {});
      updatedMessages[action.payload.chatId - 1].messages = newContentArray;
      return {
        ...state,
        messages: updatedMessages
      }
  }
  return state
}

// actions
const loadData = payload => ({
    type: 'LOAD_DATA', 
    payload,
});

const addMessage = payload => ({
    type: 'ADD_MESSAGE',
    payload
}) 

let store = createStore(reducer, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export { store, loadData, addMessage }