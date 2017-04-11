import React from 'react'

import { ADD } from './actions'
import { dispatch } from 'redux'
import { connect } from 'react-redux'

class App extends React.Component {
    constructor (props) {
        console.log(props)
        super(props)

    }
    render () {
        return <div>Hello World! <br/><button onClick={this.props.onclick}>增加</button></div>
    }
}

const mapStateToProps = (state) => {
    return {
        text: 'ss'
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onclick: () => {
            dispatch(ADD('yes'))
        }
    }
}

//{text: "ss", onclick: function}

export default connect(mapStateToProps,mapDispatchToProps)(App)