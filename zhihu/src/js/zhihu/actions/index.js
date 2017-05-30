import 'es6-promise'
import fetch from 'isomorphic-fetch'

export const REQUEST_THEMES_DATA = 'REQUEST_THEMES_DATA'   
export const RECEIVE_THEMES_DATA = 'RECEIVE_THEMES_DATA'   
export const REQUEST_HOME_DATA = 'REQUEST_HOME_DATA'  
export const RECEIVE_HOME_DATA = 'RECEIVE_HOME_DATA'  
export const REQUEST_CALL_NEXT_DATA = 'REQUEST_CALL_NEXT_DATA'  
export const RECEIVE_CALL_NEXT_DATA = 'RECEIVE_CALL_NEXT_DATA' 

export const REQUEST_HANDLE_TAB_DATA = 'REQUEST_HANDLE_TAB_DATA'  
export const RECEIVE_HANDLE_TAB_DATA = 'RECEIVE_HANDLE_TAB_DATA' 

export const SHOW_LOADING = 'SHOW_LOADING'
export const HIDE_LOADING = 'HIDE_LOADING'
export const START_CALLING = 'START_CALLING'
export const STOP_CALLING = 'STOP_CALLING'
export const HANDLE_DATE = 'HANDLE_DATE'
export const HANDLE_TAB = 'HANDLE_TAB'


//侧滑栏数据
function requestGetThemesData() {               //发起请求
  return {
    type: REQUEST_THEMES_DATA,
    calling: true
  }
}

function receiveGetThemesData(data) {    //接受到请求结果
  return {
    type: RECEIVE_THEMES_DATA,
    themes: data.others,
    calling: false
  }
}

export function getThemesData() {            //将上面两个请求动作连接
    return dispatch => {
        dispatch(requestGetThemesData())
        fetch('http://111.230.139.105/api/zhihu/themes')
          .then(res=>{
            return res.json()
          })
          .then(data=>{
            dispatch(receiveGetThemesData(data))
          })
          .catch(e=>{
            new Error(e)
          })
    }
}



//首页数据 banner与list
function requestGetHomeData() {              
  return {
    type: REQUEST_HOME_DATA,
    loading: true,
    calling: true
  }
}

function receiveGetHomeData(data) {   
  return {
    type: RECEIVE_HOME_DATA,
    loading: false,
    top_stories: data.top_stories,
    stories: data.stories,
    date: data.date,
    calling: false
  }
}


export function getHomeData(cb) { 
    return dispatch => {
      console.log('getHomeData');
        dispatch(requestGetHomeData())
        fetch('http://111.230.139.105/api/zhihu//news/latest')
            .then(res=>{
              return res.json();
            })
            .then(data=>{
              dispatch(receiveGetHomeData(data))
              cb();
              // dispatch(stopCalling())
            })
            .catch((e)=>{
              new Error(e)
            })
    }
}


//请求下一页的数据
function requestNextData() {              
  return {
    type: REQUEST_CALL_NEXT_DATA,
    loading: true,
    calling: true
  }
}


function receiveNextData(data) {   
  return {
    type: RECEIVE_CALL_NEXT_DATA,
    stories: data.stories,
    loading: false,
    calling: false
  }
}


export function getNextData(date) {   
    return dispatch => {
        dispatch(requestTabData())
        fetch('http://111.230.139.105/api/zhihu/news/before/' + date)
          .then(res=>{
            return res.json();
          })
          .then(data=>{
            dispatch(receiveNextData(data))
          })
          .catch(e=>{
            new Error(e)
          })
    }
}




//切换侧滑栏tanb后list数据
function requestTabData() {              
  return {
    type: REQUEST_HANDLE_TAB_DATA,
    loading: true,
    calling: true
  }
}


function receiveTabData(data) {   
  return {
    type: RECEIVE_HANDLE_TAB_DATA,
    stories: data.stories,
    loading: false,
    calling: true
  }
}


export function getTabData(tabId) {   
    return dispatch => {
        dispatch(handleTab(tabId))
        dispatch(requestTabData())
        fetch('http://111.230.139.105/api/zhihu/theme/'+tabId)
          .then(res=>{
            return res.json()
          })
          .then(data=>{
            $('html,body').animate({ scrollTop: 0 }, 0);
            dispatch(receiveTabData(data))
            $(document).unbind('scroll');	//解除滚动到底部自动加载
          })
          .catch(e=>{
            new Error(e)
          })
    }
}


export function showLoading() {              
  return {
    type: SHOW_LOADING,
    loading: true
  }
}

export function hideLoading() {              
  return {
    type: HIDE_LOADING,
    loading: false
  }
}

export function startCalling() {              
  return {
    type: START_CALLING,
    calling: true
  }
}

export function stopCalling() {              
  return {
    type: STOP_CALLING,
    calling: false
  }
}

export function handleDate(date) {              
  return {
    type: HANDLE_DATE,
    date
  }
}

export function handleTab(tabId) {              
  return {
    type: HANDLE_TAB,
    tabId
  }
}