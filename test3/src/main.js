import React from 'react' 
import ReactDOM from 'react-dom'
import { createStore,applyMiddleware } from 'redux'
import { Provider,connect } from 'react-redux'
import thunk from 'redux-thunk'
import Jisuanqi from './Jisuanqi'

const JIA = {type: 'jia'}
const JIAN = {type: 'jian'}

let ajaxData = (dispatch,type) => {
    fetch('https://raw.githubusercontent.com/fengnovo/node-server/master/redux-thunk/a.json')
        .then(data=>data.json())
        .then(data=>{
            dispatch({type:'loadData',payload: data})
        })
}

let jisuanqi = (state={list:[]},action) => {
    let list = state.list
    switch (action.type){
        case 'jia':
            return {list:[2,3,4]}
        case 'jian':
            return {list:['a','b','c']}
        case 'loadData':
            return {list: action.payload}
        default: 
            return state
    }
}

let store = createStore(jisuanqi,applyMiddleware(thunk));

let mapStateToProps = () => {

}

let mapDispatchToProps = dispatch => {

}

let App = connect(
    state => {
        return {
            list: state.list
        }   
    },
    dispatch => {
        return {
            onZengjia: () => dispatch(JIA),
            onJianshao: () => dispatch(JIAN),  
            loadData: type => ajaxData(dispatch,type)
        }
    }
)(Jisuanqi)


ReactDOM.render(
    <Provider store={store}>
    <App />
 </Provider>,document.getElementById('app'))