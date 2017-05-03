import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger }  from 'redux-logger';
import { reducers } from './js/reducers';

import injectTapEventPlugin from 'react-tap-event-plugin';

import './css/index.scss';

import App from './js/App';

injectTapEventPlugin();

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    logger
)(createStore);

const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
document.getElementById('app'));
