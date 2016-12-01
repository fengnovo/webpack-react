import React from 'react'



class Jisuanqi extends React.Component {
    constructor (props) {
        super(props)
    }
    render () {
        const {count,onZengjia,onJianshao} = this.props
        return (
            <div>
                <span>{count}</span>
                <button onClick={onZengjia}>加</button>
                <button onClick={onJianshao}>减</button>
            </div>
        )
    }
}

export default Jisuanqi