import 'es6-promise'
import fetch from 'isomorphic-fetch'
import {imgUrl} from '../util'

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


export const REQUEST_COMMENT_DATA = 'REQUEST_COMMENT_DATA'
export const RECEIVE_COMMENT_DATA = 'RECEIVE_COMMENT_DATA'

export const REQUEST_DETAIL_DATA = 'REQUEST_DETAIL_DATA'
export const RECEIVE_DETAIL_DATA = 'RECEIVE_DETAIL_DATA'

export const REQUEST_COUNT_DATA = 'REQUEST_COUNT_DATA'
export const RECEIVE_COUNT_DATA = 'RECEIVE_COUNT_DATA'
export const SET_POS = 'SET_POS'

import {getd3 } from '../util'

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
              dispatch(handleDate(data.date)) //把后台返回的日期放到store
              data.stories.unshift({date: getd3(data.date)})
              dispatch(receiveGetHomeData(data))
              cb();
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
        dispatch(requestNextData())
        fetch('http://111.230.139.105/api/zhihu/news/before/' + date)
          .then(res=>{
            return res.json();
          })
          .then(data=>{
            dispatch(handleDate(data.date)) //把后台返回的日期放到store
            data.stories.unshift({date: getd3(data.date)})
            dispatch(receiveNextData(data))
            dispatch(stopCalling())
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
            // dispatch(handleDate(data.date))
            dispatch(receiveTabData(data))
            $(document).unbind('scroll');	//解除滚动到底部自动加载
          })
          .catch(e=>{
            new Error(e)
          })
    }
}

export function setPos(pos) {
  return {
    type: SET_POS,
    pos
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



//评论列表数据
function requestCommentData() {               //发起请求
  return {
    type: REQUEST_COMMENT_DATA
  }
}

function receiveCommentData(data) {    //接受到请求结果
  return {
    type: RECEIVE_COMMENT_DATA,
    comments: data.comments,
		leng: data.comments && data.comments.length
  }
}

export function getCommentData(articleId) {            //将上面两个请求动作连接
    return dispatch => {
        dispatch(requestCommentData())
        fetch(`http://111.230.139.105/api/zhihu/story/${articleId}/short-comments`)
          .then(res=>{
            return res.json()
          })
          .then(data=>{
              dispatch(receiveCommentData(data))
          })
    }
}

//正文详情数据
function requestDetailData() {        
  return {
    type: REQUEST_DETAIL_DATA,
    loading: true,               //此loading非上面首页loading，只是用于action
    content: ''
  }
}
function receiveDetailData(data) {    //接受到请求结果
  return {
    type: RECEIVE_DETAIL_DATA,
    loading: false,
    css: data.css,
		content: data.content
  }
}

export function getDetailData(articleId) {            //将上面两个请求动作连接
    return dispatch => {
        dispatch(requestDetailData())
        fetch(`http://111.230.139.105/api/zhihu/news/${articleId}`)
                .then(res=>{
                    return res.json()
                })
                .then(data=>{
                    if(data.css){
                        $('[data-cssname=cssKey]').remove()
                        $('<link data-cssname="cssKey" type="text/css" rel="stylesheet" href='+data.css+' />').appendTo('head') 
                    }
                    var _html = '';
                    if(data.image){
                        _html += '<div class="banner" style="background-size: cover;background-image:url('+imgUrl(data.image)+')">'
                                +'<span class="title">'+data.title+'</span>'
                                +'</div>'
                    }
                    _html += '<div>'+data.body+'</div>';
                    dispatch(receiveDetailData({
                        css: data.css,
                        content: _html
                    }))
                    setTimeout(()=>{
                        $('.img-place-holder').remove();
                        $('#detail-content img').map(function(i,item){
                            // console.log(item)
                            var x = imgUrl($(item).attr('src'));
                            $(item).attr('src',x);
                        });
                         
                    },300)
                })
                .catch(e=>{
                    new Error(e)
                })
    }
}


//正文点赞数，评论数数据
function requestCountData() {        
  return {
    type: REQUEST_COUNT_DATA
  }
}
function receiveCountData(data) {    //接受到请求结果
  return {
    type: RECEIVE_COUNT_DATA,
		comments: data.comments,
    popularity: data.popularity
  }
}

export function getCountData(articleId) {            //将上面两个请求动作连接
    return dispatch => {
        dispatch(requestCountData())
        fetch(`http://111.230.139.105/api/zhihu/story-extra/${articleId}`)
                .then(res=>{
                    return res.json()
                })
                .then(data=>{
                    dispatch(receiveCountData(data)) 
                })
                .catch(e=>{
                    new Error(e)
                })
    }
}

