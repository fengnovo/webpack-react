import React from 'react';
import ReactDOM from 'react-dom';
import Redux, { createStore } from 'redux';
 
import { reducer } from './reducer';
import { App } from './app';
 
const store = createStore(reducer);
 
const render = () => (
  ReactDOM.render(<App store={store}/>,
    document.getElementById('example'))
)
 
store.subscribe(render);
 
render();