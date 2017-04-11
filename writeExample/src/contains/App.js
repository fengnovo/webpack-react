import React from 'react'

import AddTodo from './AddTodo'
import TodoList from './Todos'
import SelectFooter from '../components/SelectFooter'

class App extends React.Component {
    constructor (...args) {
        super(...args)
    }
    render (){
        return <div>
                <AddTodo />
                <TodoList />
                <SelectFooter />
            </div>
    }
}

export default App
