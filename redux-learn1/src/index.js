import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './js/App'
import changeInput from './js/reducer'

let store = createStore(changeInput);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#app")
);