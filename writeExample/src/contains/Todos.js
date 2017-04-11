import { connect } from 'react-redux'
import { dispatch } from 'redux'
import { TOGGLE } from '../actions'
import TodoList from '../components/TodoList'

/*
{
    TodosReducer,
    SelectFilterReducer
}
*/
const getShowTodos = (todosReducer,selectFilterReducer) => {
    switch (selectFilterReducer) {
        case 'ALL':
            return todosReducer
        case 'ACTIVE':
            return todosReducer.filter(item=>!item.isCompleted)
        case 'COMPLETED':
            return todosReducer.filter(item=>item.isCompleted)
        default: 
            return '未知错误'
    }
}


const mapStateToProps = (state) => {                 //这里参数不能加花括号
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