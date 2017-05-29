import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import App from './App'
import Detail from './Detail'
import Comment from './Comment'



var rootElement = document.getElementById('app')
var cacheData = {};
var updateData = (key,data) => {
    cacheData[key] = data
}
var pushData = (key,data) => { 
    cacheData.data[key] = data
}

render(
    <Router>
        <div>
            <Route exact path="/" render={() => {
                console.log(cacheData);
                return <App cacheData={cacheData} updateData={updateData} pushData={pushData}/>}
            } />
            <Route path="/detail/:id" component={Detail} />
            <Route path="/comment/:id" component={Comment} />
        </div>
    </Router>,
    rootElement
)