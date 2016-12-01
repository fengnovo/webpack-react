import React from 'react' 
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider,connect } from 'react-redux'
import Jisuanqi from './Jisuanqi'

const JIA = {type: 'jia'}
const JIAN = {type: 'jian'}


let jisuanqi = (state={list:[]},action) => {
    let list = state.list
    switch (action.type){
        case 'jia':
            return {list:[2,3,4]}
        case 'jian':
            return {list:['a','b','c']}
        case 'loadData':
            return {list: ['121234233','wqefqw','123fversddv32']}
        default: 
            return state
    }
}

let store = createStore(jisuanqi);

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
            onZengjia: ()=> dispatch(JIA),
            onJianshao: ()=>dispatch(JIAN),  
            loadData: (action) => dispatch(action) 
        }
    }
)(Jisuanqi)


ReactDOM.render(
    <Provider store={store}>
    <App />
 </Provider>,document.getElementById('app'))