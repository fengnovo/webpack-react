import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { reducers } from './js/reducers'

import App from './js/App'

let middleware = [thunk]

if(process.env.NODE_ENV !== 'production'){
    middleware.push(createLogger)
}

let store = createStore(reducers,applyMiddleware(...middleware))

ReactDOM.render(<Provider store={store}>
    <App/>
</Provider>,document.getElementById('app'))