import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

import App from './containers/App'
import Detail from './containers/Detail'
import Comment from './containers/Comment'

let store = configureStore();

let rootElement = document.getElementById('app')

render(
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" component={App} />
                <Route path="/detail/:id" component={Detail} />
                <Route path="/comment/:id" component={Comment} />
            </div>
        </Router> 
    </Provider>,
    rootElement
)