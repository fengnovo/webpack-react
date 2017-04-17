import React from 'react'
import { connect } from 'react-redux'
import { ADD } from '../actions'

let AddTodo = ({dispatch}) => {     //来自props的，参数要加花括号
    let input
    return <div>
        <form onSubmit={e=>{
                e.preventDefault()
                if(!input.value.trim()){ return }
                dispatch(ADD(input.value))
                input.value = ''
            }}>
            <input ref={node=>{input=node}}/>
            <button type="submit">添加</button>
        </form>
    </div>
}

AddTodo = connect()(AddTodo);

export default AddTodo