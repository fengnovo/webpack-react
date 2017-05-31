import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, IndexRoute, Router, hashHistory, browserHistory } from 'react-router';


import { applyMiddleware, createStore, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import Home from './Home.js'
import Detail from './Detail.js'

import reducers from './reducers';

const enhancer = compose(
        applyMiddleware(thunk, createLogger()),
        window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(reducers,enhancer)


const App = ({children}) => <div id="container">{children} </div>

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={Home}/>
                <Route path='/detail/:id' component={Detail}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
)

