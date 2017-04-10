import { connect } from 'react-redux'
import { dispatch } from 'redux'
import { TOGGLE } from '../actions'
import TodoList from '../components/TodoList'

const mapStateToProps = state => {                 //这里参数不能加花括号
    return {
        todos: state
    }
}

const mapDispatchToProps = (dispatch,ownProps) => { //这里参数不能加花括号
    return {
        onTodoClick: (id) => {
            dispatch(TOGGLE(id))
        }
    }
}

const Todos = connect(                              //这里不能加花括号
    mapStateToProps,
    mapDispatchToProps
)(TodoList)

export default Todos