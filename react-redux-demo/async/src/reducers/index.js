import { combineReducers } from 'redux'
import {
  SELECT_REDDIT, INVALIDATE_REDDIT,
  REQUEST_POSTS, RECEIVE_POSTS
} from '../actions'

const selectedReddit = (state = 'reactjs', action) => {
  switch (action.type) {
    case SELECT_REDDIT:
      return action.reddit
    default:
      return state
  }
}

const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_REDDIT:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_POSTS:
      console.log('REQUEST_POSTS-----2');
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_POSTS: 
      console.log('RECEIVE_POSTS-----1');
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const postsByReddit = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_REDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      console.log('REQUEST_POSTS-----1');
      console.log(action);       //一开始是"REQUEST_POSTS"，之后是"RECEIVE_POSTS"
     // {type: "RECEIVE_POSTS", reddit: "reactjs", posts: Array[25], receivedAt: 1488523742748}
      console.log(action.reddit);         //reactjs
      console.log(state);                 //{reactjs: Object}
      console.log(state[action.reddit]);  //  Object
      console.log({[action.reddit]:''});  // {reactjs: ""}
      return {
        ...state, 
        [action.reddit]: posts(state[action.reddit], action)

        // {

        //   'reactjs':{
        //       isFetching: false,
        //       didInvalidate: false,
        //       items: []
        //     }
        // } 
        //{'reactjs':{isFetching: true,didInvalidate: false}}
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsByReddit,
  selectedReddit
})


/*
{
  postsByReddit : {
          'reactjs':{
              isFetching: false,
              didInvalidate: false,
              items: []
            }
        } ,
  selectedReddit : 'reactjs'
}
*/


export default rootReducer
