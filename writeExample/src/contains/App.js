import React from 'react'

import AddTodo from './AddTodo'
import TodoList from './Todos'
import Footer from './Footer'

class App extends React.Component {
    constructor (...args) {
        super(...args)
    }
    render (){
        return <div>
                <AddTodo />
                <TodoList />
                <Footer />
            </div>
    }
}

export default App
