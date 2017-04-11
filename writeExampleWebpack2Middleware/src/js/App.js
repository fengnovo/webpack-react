import React from 'react'

import Header from './containers/Header'
import Body from './containers/Body'
import Footer from './containers/Footer'

class App extends React.Component {
    constructor (props) {
        super(props)

    }
    render () {
        return <div>
            <Header />
            <Body />
            <Footer />
        </div>
    }
}

export default App