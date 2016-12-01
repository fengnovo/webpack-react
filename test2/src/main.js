import React from 'react' 
import ReactDOM from 'react-dom'
// import Redux from 'redux'
// import ReactRedux from 'react-redux'
import { createStore } from 'redux'
import { Provider,connect } from 'react-redux'
import Jisuanqi from './Jisuanqi'

const JIA = {type: 'jia'}
const JIAN = {type: 'jian'}

let jisuanqi = (state={count:0},action) => {
    let count = state.count
    switch (action.type){
        case 'jia':
            console.log(count);
            return {count:count+1}
        case 'jian':
            console.log(count);
            return {count:count-1}
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
            count: state.count
        }   
    },
    dispatch => {
        return {
            onZengjia: ()=> dispatch(JIA),
            onJianshao: ()=>dispatch(JIAN)  
        }
    }
)(Jisuanqi)


ReactDOM.render(
    <Provider store={store}>
    <App />
 </Provider>,document.getElementById('app'))