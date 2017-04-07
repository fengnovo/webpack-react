
//处理action行为
const TodoReducer = (state,action) => {
    switch (action.type) {
        case 'ADD': 
            return {
                id: action.id,
                text: action.text,
                isCompleted: false
            }
        case 'TOGGLE':
            console.log(action);
            if(state.id !== action.id){
                return state
            } 
            return {
                ...state,
                isCompleted: !state.isCompleted
            }  

        default : 
            return state
    }
        
}

// const TodosReducer = (state=[],action) => {
//     switch (action.type) {
//         case 'ADD':
//             let addOne = TodoReducer(undefined,action)
//             state = state.push(addOne)
//             return state
//         case 'TOGGLE': 
//             state.map(item=>TodoReducer(item,action))
//             return state
//         default : 
//             return state
//     }
// }

const TodosReducer = (state=[],action) => {
    switch (action.type) {
        case 'ADD':
            return [
                ...state,
                TodoReducer(undefined,action)
            ]

        case 'TOGGLE':
            return state.map(t => 
                TodoReducer(t,action)
            )

        default:
            return state
    }
}

const SelectFilterReducer = (state='ALL',action) => {
    switch (action.type) {
        case 'SELECT':
            return action.filter
            break
        default:
            break
    }
}

export default TodosReducer