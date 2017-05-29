import { combineReducers } from 'redux'

let initState = {
    testData: []
}

let test = (state = initState, action) => {
    switch (action.type) {
        case 'SAVE_REDUCER':
            return {
                ...state,
                testData: action.data
            }

        default:
            return state;
    }
}

export const reducers = combineReducers({test})