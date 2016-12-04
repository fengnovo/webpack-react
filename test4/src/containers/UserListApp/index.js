import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userAction from '../../actions/user'
import axios from 'axios'
import { UserList } from '../../components'

const mapStateToProps = state => {
    return {
        users: state.user.users,
        usersById: state.user.userById
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        actions: bindActionCreators(userAction,dispatch)
    })
}

class UserListApp extends React.Component {
    constructor (props) {
        super (props)
    }
    componentWillMount () {
        const {actions} = this.props
         console.log(this.props);
        axios.get('/mock/users.json')
            .then(ret=>{
                // console.log(ret);
                // console.log(actions);
                // action.setUser(ret.data)
            })
    }
    render (){
        return (
            <div>UserListApp</div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserListApp)