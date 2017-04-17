import React from 'react'
const Todo = ({onclick,isCompleted,text}) =>{       //来自props的，参数要加花括号
    return <li onClick={onclick}
                style={{textDecoration: isCompleted ? "line-through": "none"}}>
               <i className={ isCompleted ? "icon-star":"icon-star-empty"}></i> {text}
    </li>
}

export default Todo