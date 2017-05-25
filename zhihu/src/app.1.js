import React from 'react'
import ReactDOM from 'react-dom'

import Promise from 'promise-polyfill' //支持IE和低版本安卓及ios7.0
import { Provider } from 'react-redux'

import { Router, hashHistory, IndexRoute } from 'react-router' 
// Browser history 是由 React Router 创建浏览器应用推荐的 history
//使用 hashHistory，浏览器上看到的 url 会是这样的: /#/a/a1?_k=adseis
//使用 browserHistory,需要服务端的支持，浏览器上看到的 url 会是这样的：/a/a1
import { syncHistoryWithStore } from 'react-router-redux' 
// 利用react-router-redux提供的syncHistoryWithStore我们可以结合store同步导航事件 

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger }  from 'redux-logger';
import { reducers } from './js/reducers';

import App from './js/App'
import Detail from './../containers/detail'


if (!window.Promise) window.Promise = Promise;

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    logger
)(createStore);

const store = createStoreWithMiddleware(reducers);

// 创建一个增强版的history来结合store同步导航事件
const history = syncHistoryWithStore(hashHistory, store)




ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={App}>
				<IndexRoute component={App} />
				<Route path="app" component={App} />
				<Route path="detail/:id" component={Detail} />
			</Route>
		</Router>
	</Provider>,
document.getElementById('app'));
