import React from 'react'
import Todo from './Todo'

const TodoList = ({todos,onTodoClick}) =>{      //来自props的，参数要加花括号
    return <ul>
        {
            todos.map((item)=> <Todo key={item.id} {...item} onclick={onTodoClick.bind(this,item.id)}/>) 
        }
    </ul>
}

export default TodoList