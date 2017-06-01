import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

import Home from './containers/Home'
import Detail from './containers/Detail'
import Comment from './containers/Comment'

import createHistory from 'history/createBrowserHistory'

const history = createHistory()

let store = configureStore();

let rootElement = document.getElementById('app')

render(
    <Provider store={store}>
        <Router history={history}>
            <div>
                <Route exact path="/" component={Home} />
                <Route path="/detail/:id" component={Detail} />
                <Route path="/comment/:id" component={Comment} />
            </div>
        </Router> 
    </Provider>,
    rootElement
)