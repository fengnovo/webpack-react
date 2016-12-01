import React, { PropTypes }from 'react'

const LOADDATA = {type: 'loadData'}


class Jisuanqi extends React.Component {
    static PropTypes = {
        list: PropTypes.array.isRequired
    }
    constructor (props) {
        super(props)
        
    }
    componentDidMount () {
        this.props.loadData(LOADDATA)
    }
    render () {
        const {list,onZengjia,onJianshao,loadData} = this.props
        return (
            <div>
                <span>{list}</span>
                <button onClick={onZengjia}>加</button>
                <button onClick={() => loadData(LOADDATA)}>减</button>
            </div>
        )
    }
}

export default Jisuanqi