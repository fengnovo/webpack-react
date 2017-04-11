import { combineReducers } from 'redux'

const todoReducer = (state,action) => {
    switch (action.type) {
        case 'ADD':     //增加一个
            return {
                id: action.id,
                text: action.text,
                isCompleted: false
            }

        case 'TOGGLE':
            if(state.id === action.id){
                return {
                    id: action.id,
                    text: state.text,
                    isCompleted: !state.isCompleted
                }
            }
            return state
            
        default:
            return state
    }
}


const todosReducer = (state=[],action) => {
    switch (action.type) {
        case 'ADD':
            return [
                ...state,
                todoReducer(undefined,action)
            ]
        case 'TOGGLE':
            return state.map(t=>todoReducer(t,action))
        default:
            return state
    }
} 


const selectRuducer = (state='ALL',action) => {
    switch (action.type) {
        case 'SELECT':
            return action.filter
        default:
            return state
    }
}

export const reducers = combineReducers({todosReducer,selectRuducer})