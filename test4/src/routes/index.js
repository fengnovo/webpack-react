import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { App,UserListApp,UserDetailApp } from '../containers'

const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App}></Route>
        <Route path="/users" component={UserListApp}></Route>
        <Route path="/users/:id" component={UserDetailApp}></Route>
    </Router>
)

export default routes

