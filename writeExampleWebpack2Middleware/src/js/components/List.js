import React from 'react'

class List extends React.Component{
    constructor (...args) {
        super(...args)
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(id) {
       this.props.onclick(id) 
    }

    render () {
        return <ul> { this.props.todos.map(todo =>
            <li onClick={()=>{this.handleClick(todo.id)}} 
                style={{textDecoration: todo.isCompleted ? 'line-through':'none'}}
                key={todo.id} >
                {todo.text}
            </li>
            ) }</ul>
    }
}

export default List