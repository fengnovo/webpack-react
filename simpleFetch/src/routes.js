import React, { Component } from 'react';
import { Route, IndexRoute, Router, hashHistory, browserHistory } from 'react-router';


import Home from './Home.js'
import Detail from './Detail.js'


class App extends Component {
    constructor(props){
        super(props)
        console.log(this.props);
    }
    render() {
        return (
            <div>{this.props.children}</div>
        )
    }
}
 
// let routes = (
//     <Route path={`${prefix}/`} component={App}>
//         <IndexRoute component={HomePage}/>
//         <Route path='post' component={PostPage}/>
//         <Route path='message' component={MessagePage}/>
//         <Route path='login' component={LoginPage}/>
//         <Route path='profile' component={ProfilePage}/>
//         <Route path='user/:name' component={AccountInfo}/>
//         <Route path='topic/:id' component={TopicContent}/>
//     </Route>
// );

let routes = (
		<Route path='/' component={App}>
                <IndexRoute component={Home}/>
                <Route path='detail/:id' component={Detail}/>
        </Route>)
export default routes;