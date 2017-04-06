import React from 'react'

import AddTodo from './AddTodo'
import TodoList from './Todos'

class App extends React.Component {
    constructor (...args) {
        super(...args)
    }
    render (){
        return <div>
                <AddTodo />
                <TodoList />
            </div>
    }
}

export default App
