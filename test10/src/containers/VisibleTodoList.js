import { connect } from 'react-redux';
import { toggleTodo } from '../actions';
import TodoList from '../components/TodoList';

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED' :
            return todos.filter( t => t.completed);
/*function isBigEnough(value) {
  return value >= 10;
}

var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
// filtered is [12, 130, 44]*/

        case 'SHOW_ACTIVE': 
            return todos.filter( t => !t.completed);
        default:
            throw new Error('未知类型');
    }
}

const mapStateToProps = state => ({
    todos: getVisibleTodos(state.todos,state.visibilityFilter)
})

// const mapDispatchToProps = ({
//     onTodoClick: toggleTodo
// })

// 上面是简写的方式
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onTodoClick : (id) => {
            console.log(ownProps);
            dispatch(toggleTodo(id));
        }
    }
}

const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)

/*const TodoList = ({todos, onTodoClick }) => (
    <ul>
        {
            todos.map(todo => 
                <Todo key = {todo.id}
                    {...todo}
                    onClick = {()=> onTodoClick(todo.id)}
                    />
            )
        }
    </ul>
)

const Todo = ({ onClick, completed, text}) => (
    <li onClick = {onClick}
        style = {{textDecoration: completed ? 'line-through':'none'}}
        >
        {text}
    </li>
)*/

export default VisibleTodoList