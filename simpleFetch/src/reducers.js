import { combineReducers } from 'redux'

import {
    FETCH_HOME_DATA_REQ,
    FETCH_HOME_DATA_RES,
    FETCH_DETAIL_DATA_REQ,
    FETCH_DETAIL_DATA_RES,
    FETCH_NEXT_DATA_REQ,
    FETCH_NEXT_DATA_RES,
    FETCHING_NEXT_DATA,
    MARK_SCROLL_Y,
    FETCH_COMMENT_DATA_REQ,
    FETCH_COMMENT_DATA_RES,
} from './actions'

let home = (state={stories:[],pos:0,loading:false},action) => {
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
        case MARK_SCROLL_Y:
            return {
                ...state,
                pos: action.pos
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

let comment = (state={comments: [],leng: 0},action) => {
    switch (action.type) {
        case FETCH_COMMENT_DATA_RES:
            return {
                comments: action.comments,
                leng: action.leng
            }
        default:
            return state
    } 
}


export default combineReducers({
    home,
    detail,
    comment
})