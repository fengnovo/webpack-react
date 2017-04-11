import React from 'react'

import { SELECT } from '../actions'
import { dispatch } from 'redux'
import { connect } from 'react-redux'

/*
selectRuducer:"ALL",
todosReducer:[]
*/

class Footer extends React.Component {
    constructor (props) {
        console.log(props)
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick (filter) {
        this.props.onclick(filter)
    }
    render () {
        return <p>
            筛选：&nbsp;&nbsp;&nbsp;&nbsp;
           {this.props.select === 'ALL' ? <span>全部</span> : <a href="#" onClick={() => this.handleClick('ALL')}>全部</a>} {', '}
           {this.props.select === 'ACTIVE' ? <span>未完成</span> : <a href="#" onClick={() => this.handleClick('ACTIVE')}>未完成</a>} {', '}
           {this.props.select === 'COMPLETED' ? <span>已完成</span> : <a href="#" onClick={() => this.handleClick('COMPLETED')}>已完成</a>}
        </p>
    }
}

const mapStateToProps = (state) => {
    return {
        component: 'Footer',
        select: state.selectRuducer
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onclick: (filter) => {
            dispatch(SELECT(filter))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Footer)