import React from 'react'


//选项
const Select = ({active, children, onclick}) => {
    if(active){             //被选中时
        return <span>
            {children}
        </span>
    }else{
        let SelectID;
        switch (children) {
            case '全部': SelectID = 'ALL'; break;
            case '未完成': SelectID = 'ACTIVE'; break;
            case '已完成': SelectID = 'COMPLETED'; break;
            default : SelectID = 'ALL'; break;
        }
        return <a href="#" onClick={()=>onclick(SelectID)}>
            {children}
        </a>
    }
}

export default Select