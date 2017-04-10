import React from 'react'

import AddTodo from './AddTodo'
import Todos from './Todos'
import SelectLink from './SelectLink'

class App extends React.Component {
    constructor (...args) {
        super(...args)
    }
    render (){
        return <div>
                <AddTodo />
                <Todos />
                <SelectLink />
            </div>
    }
}

export default App
