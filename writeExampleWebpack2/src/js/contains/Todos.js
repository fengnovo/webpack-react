import { connect } from 'react-redux'
import { dispatch } from 'redux'
import { TOGGLE } from '../actions'
import TodoList from '../components/TodoList'

const getShowTodos = (todos,filter) => {
    console.log(todos,filter);
    switch (filter) {
        case "ALL":
            return todos
        case "COMPLETED":
            return todos.filter(todo => todo.isCompleted)
        case "ACTIVE":
            return todos.filter(todo => !todo.isCompleted)
        default:
            throw new Error('未知类型');
    }
}

const mapStateToProps = state => {                 //这里参数不能加花括号
    return {
        todos: getShowTodos(state.TodosReducer, state.SelectFilterReducer)
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