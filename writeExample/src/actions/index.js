let id=0;

export const ADD = text => {       //增加办事项
    return {
        type: "ADD",
        id: id++,
        text: text
    }
}

export const TOGGLE = id => {      //切换办事项状态
    return {
        type: "TOGGLE",
        id: id
    }
}

export const SELECTFILITER = filter => {      //查看办事项列表
    return {
        type: "SELECT",
        filter: filter
    }
}
