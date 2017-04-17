import React from 'react'

import AddTodo from './AddTodo'
import Todos from './Todos'
import Footer from '../components/Footer'

class App extends React.Component {
    constructor (...args) {
        super(...args)
    }
    render (){
        return <div>
                <AddTodo />
                <Todos />
                <Footer />
            </div>
    }
}

export default App
