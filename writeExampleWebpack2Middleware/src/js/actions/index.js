let todo_id = 0;
export const ADD = (text) => {
    return {
        type: 'ADD',
        id: todo_id++,
        text
    }
}

export const TOGGLE = (id) => {
    return {
        type: 'TOGGLE',
        id          //切换的id
    }
}

export const SELECT = (filter) => {
    return {
        type: 'SELECT',
        filter      //字符串
    }
}

