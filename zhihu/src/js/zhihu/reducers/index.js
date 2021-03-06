import { combineReducers } from 'redux'
import {
  REQUEST_THEMES_DATA, 
  RECEIVE_THEMES_DATA,
  REQUEST_HOME_DATA,
  RECEIVE_HOME_DATA,
  REQUEST_CALL_NEXT_DATA,
  RECEIVE_CALL_NEXT_DATA, 
  REQUEST_HANDLE_TAB_DATA, 
  RECEIVE_HANDLE_TAB_DATA,


  SHOW_LOADING,
  HIDE_LOADING,
  START_CALLING,
  STOP_CALLING,
  HANDLE_DATE,
  HANDLE_TAB,

  REQUEST_COMMENT_DATA,
  RECEIVE_COMMENT_DATA,

  RECEIVE_DETAIL_DATA,

  REQUEST_COUNT_DATA,
  RECEIVE_COUNT_DATA,

  SET_POS,

} from '../actions'

import { getd1, getd2 } from '../util'

let today = getd1(getd2(new Date())) //today作为初始的date

function themes(state = [], action) {
  switch (action.type) {
    case RECEIVE_THEMES_DATA:       //请求侧滑栏主题列表
      return  action.themes
    default:
      return state
  }
}

function top_stories(state = [], action) {
  switch (action.type) {            
    case RECEIVE_HOME_DATA:         //请求首页列表
      return  action.top_stories
    default:
      return state
  }
}

function stories(state = [], action) {
  switch (action.type) {
    case RECEIVE_HOME_DATA:         //请求首页列表
      return  action.stories
    case RECEIVE_CALL_NEXT_DATA:    //请求下一页列表
    console.log(action);
      return  [ ...state, ...action.stories]
    case RECEIVE_HANDLE_TAB_DATA:    //切换后列表
      return  action.stories
    default:
      return state
  }
}

function loading(state = true, action) {
  switch (action.type) {
    case RECEIVE_THEMES_DATA:
      return  false
    case RECEIVE_HOME_DATA:
      return  false
    case RECEIVE_CALL_NEXT_DATA:
      return  false
    case SHOW_LOADING:
      return  true
    case HIDE_LOADING:
      return  false
    default:
      return state
  }
}

function calling(state = false, action) {
  switch (action.type) {
    case START_CALLING:
      return true
    case STOP_CALLING:
      return false
    default:
      return state
  }
}

function date(state = today, action) {
  switch (action.type) {
    case HANDLE_DATE:
      return action.date
    default:
      return state
  }
}

function tabId(state = '', action) {
  switch (action.type) {
    case HANDLE_TAB:
      return action.tabId
    default:
      return state
  }
}

function pos(state = 0, action) {
  switch (action.type) {
    case SET_POS:
      return action.pos;
    default:
      return state;
  }
}


function comments(state = {comments:[],leng:0}, action) {
  switch (action.type) {
    case RECEIVE_COMMENT_DATA:
      return {
          leng: action.leng,
		      comments:action.comments
      }
    default:
      return state
  }
}

function detail(state = {loading: true,content: '',comments:0,popularity:0,css: null}, action) {
  switch (action.type) {
    case RECEIVE_DETAIL_DATA:
      return {
          ...state,
          loading: action.loading,
          content: action.content,
          css: action.css
      }
    case RECEIVE_COUNT_DATA:
      return {
          ...state,
          comments: action.comments,
          popularity: action.popularity
      }
    default:
      return state
  }
}


const home = combineReducers({
  themes,
  top_stories,
  stories,
  loading,
  calling,
  date,
  tabId,
  pos,
})




const rootReducer = combineReducers({
  home,
  detail,
  comments
})

export default rootReducer