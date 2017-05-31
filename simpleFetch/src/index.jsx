import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, IndexRoute, Router, hashHistory, browserHistory } from 'react-router';


import { applyMiddleware, createStore, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import routes from './routes'

import reducers from './reducers';

const enhancer = compose(
        applyMiddleware(thunk, createLogger()),
        window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(reducers,enhancer)



render(
    <Provider store={store}>
        <Router routes={routes} history={browserHistory}/>
    </Provider>,
    document.getElementById('root')
)

