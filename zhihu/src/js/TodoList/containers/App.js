import React, { Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'
import Footer from '../components/Footer'

class App extends Component {
  render() {
    // Injected by connect() call:
    const { dispatch, visibleTodos, visibilityFilter } = this.props //{dispatch,[],'SHOW_ALL'}
    return (
      <div>
        <AddTodo
          onAddClick={text =>
            dispatch(addTodo(text))         //只要是定义的action都可以dispatch，addTodo(text)返回一个行为的描述对象
          } />
        <TodoList
          todos={visibleTodos}
          onTodoClick={index =>
            dispatch(completeTodo(index))
          } />
        <Footer
          filter={visibilityFilter}
          onFilterChange={nextFilter =>
            dispatch(setVisibilityFilter(nextFilter))
          } />
      </div>
    )
  }
}

App.propTypes = {
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  visibilityFilter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
}

function selectTodos(todos, filter) { //selectTodos([], 'SHOW_ALL')
  switch (filter) {                   //'SHOW_ALL'
    case VisibilityFilters.SHOW_ALL:  //'SHOW_ALL'--------------------->当前的state要和action定义的东西进行对比
      return todos                    // []
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed)
  }
}

/**
 * 全局state
  {
    visibilityFilter:'SHOW_ALL',
    todos:[]
  }
 */


// 基于全局 state ，哪些是我们想注入的 props ? 本组件从全局state中取本组件所需的state，变现为子组件的props
/**
 子组件的props
 {
    visibleTodos: [],
    visibilityFilter: 'SHOW_ALL'
  }
 */
function select(state) {
  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter), //[]
    visibilityFilter: state.visibilityFilter                        //'SHOW_ALL'
  }
}

//默认的全局state已在createStore那里注入
// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(App)