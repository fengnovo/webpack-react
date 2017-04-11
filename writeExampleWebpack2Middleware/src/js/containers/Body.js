import React from 'react'

import { TOGGLE } from '../actions'
import { dispatch } from 'redux'
import { connect } from 'react-redux'

import List from '../components/List'
/*
selectRuducer:"ALL",
todosReducer:[]
*/

class Body extends React.Component {
    constructor (props) {
        console.log(props)
        super(props)
    }
    render () {
        return <List {...this.props}/>
    }
}

const getShowTodos = (state) => {
    switch (state.selectRuducer) {
        case 'ALL':
            return state.todosReducer
        case 'ACTIVE':
            return state.todosReducer.filter(todo => !todo.isCompleted)
        case 'COMPLETED': 
            return state.todosReducer.filter(todo => todo.isCompleted)
        default:
            throw new Error('筛选错误');
            return 
    }

     
}

const mapStateToProps = (state) => {
    return {
        component: 'Body',
        todos: getShowTodos(state),
        filter: state.selectRuducer
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onclick: (id) => {
            console.log(id);
            dispatch(TOGGLE(id))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Body)