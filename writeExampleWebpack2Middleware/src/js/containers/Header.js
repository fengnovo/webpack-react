import React from 'react'

import { ADD } from '../actions'
import { dispatch } from 'redux'
import { connect } from 'react-redux'


//todo输入框
class Header extends React.Component {
    constructor (props) {
        console.log(props)
        super(props)
        this.handlePush = this.handlePush.bind(this)
    }

    handlePush () {
        let pushText = this.refs.input.value.trim();
        console.log(pushText)
        if(pushText != '') {
            this.props.onclick(pushText)
            this.refs.input.value = ''
        }
    }

    render () {
        return <div>
            <input ref="input" type="text" placeholder="请输入"/><button onClick={this.handlePush}>确认</button>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        component: 'Header'
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onclick: (pushText) => {
            dispatch(ADD(pushText))
        }
    }
}

//{text: "ss", onclick: function}

export default connect(mapStateToProps,mapDispatchToProps)(Header)