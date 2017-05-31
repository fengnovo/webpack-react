import { combineReducers } from 'redux'

import {
    FETCH_HOME_DATA_REQ,
    FETCH_HOME_DATA_RES,
    FETCH_DETAIL_DATA_REQ,
    FETCH_DETAIL_DATA_RES,
    FETCH_NEXT_DATA_REQ,
    FETCH_NEXT_DATA_RES,
    FETCHING_NEXT_DATA,
} from './actions'

let home = (state={stories:[]},action) => {
    switch (action.type) {
        case FETCH_HOME_DATA_RES:
            return {
                ...state,
                stories: action.stories
            }
        case FETCH_NEXT_DATA_RES:
            return {
                ...state,
                stories: state.stories.concat(action.stories),
                loading: action.loading
            }
        case FETCHING_NEXT_DATA:
            return {
                ...state,
                loading: action.loading
            }
        default:
            return state
    } 
}

let detail = (state={content:''},action) => {
    switch (action.type) {
        case FETCH_DETAIL_DATA_REQ:
            return state
        case FETCH_DETAIL_DATA_RES:
            return {
                content: action.content
            }
        default:
            return state
    } 
}


export default combineReducers({
    home,
    detail
})