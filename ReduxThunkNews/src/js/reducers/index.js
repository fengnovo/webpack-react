import { combineReducers } from 'redux'


let DATA = (state = {fetchData: []}, action) => {
    switch (action.type) {
        case 'FETCH':
            return {
                ...state,
                fetchData: action.data.data
            }

        default:
            return state;
    }
}

let SELECT = (state = '', action) => {
    switch (action.type) {
        case 'TAB':
            return action.SELECT

        default:
            return state;
    }
}

export const reducers = combineReducers({DATA,SELECT})

/*
{   
    DATA: {fetchData: []},
    SELECT: ''
}
*/