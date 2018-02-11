import { createStore } from 'redux';

let init = {};

// reducers
function reducer (state = init, action) {

  switch (action.type) {
    case 'LOAD_DATA':
      return {
        ...state,
        ...action.payload,
      }
  }
  return state
}

// actions
function loadData (payload) {
  return {
    type: 'LOAD_DATA', 
    payload,
  }
}

let store = createStore(reducer, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export { store, loadData }