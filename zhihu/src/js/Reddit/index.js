import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import Root from './containers/Root'


let store = configureStore();

let rootElement = document.getElementById('app')
render(
  <Provider store={store}>
    <Root />
  </Provider>,
  rootElement
)