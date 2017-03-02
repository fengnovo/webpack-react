import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import reducer from './reducers';


const store = createStore(
   reducer
)
//当开发时chrome浏览器安装了REDUX插件时，可以加下面一句调试
// const store = createStore(
//    reducer,
//    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )

store.subscribe(() =>{
  console.log('下面一行打印的是当前整棵树（整个app）的state');
  console.log(store.getState());
});

render(
  <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app')
)