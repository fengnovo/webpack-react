import React from 'react'
import ReactDom from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import TodoAppReducer from './js/reducers'

import App from './js/contains/App'

import './css/font/fontawesome-webfont.eot'
import './css/font/fontawesome-webfont.svg'
import './css/font/fontawesome-webfont.ttf'
import './css/font/fontawesome-webfont.woff'
import './css/font/FontAwesome.otf'
import './css/common.css'

let store = createStore(TodoAppReducer,
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(()=>{
    // console.log(store.getState());
})

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)