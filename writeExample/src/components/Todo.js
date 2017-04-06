import React from 'react'
const Todo = ({onclick,isCompleted,text}) =>{       //来自props的，参数要加花括号
    return <li onClick={onclick}
                style={{textDecoration: isCompleted ? "line-through": "none"}}>
                {text}
    </li>
}

export default Todo