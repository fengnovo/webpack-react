import React from 'react'

class UserList extends React.Component {
    constructor (props) {
        super (props)
    }
    render (){
        let liArr = [];
        this.props.liArr.map((item,i)=>{
            liArr.push(<li key={i}>{item}</li>)
        })
        return (
            <ul>
                {liArr}
            </ul>
        )
    }
}

export default UserList