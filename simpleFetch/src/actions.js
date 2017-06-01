import fetch from 'isomorphic-fetch'

export const FETCH_HOME_DATA_REQ = 'FETCH_HOME_DATA_REQ'
export const FETCH_HOME_DATA_RES = 'FETCH_HOME_DATA_RES'
export const FETCH_DETAIL_DATA_REQ = 'FETCH_DETAIL_DATA_REQ'
export const FETCH_DETAIL_DATA_RES = 'FETCH_DETAIL_DATA_RES'
export const FETCH_NEXT_DATA_REQ = 'FETCH_NEXT_DATA_REQ'
export const FETCH_NEXT_DATA_RES = 'FETCH_NEXT_DATA_RES'
export const FETCHING_NEXT_DATA = 'FETCHING_NEXT_DATA'
export const MARK_SCROLL_Y = 'MARK_SCROLL_Y'
export const FETCH_COMMENT_DATA_REQ = 'FETCH_COMMENT_DATA_REQ'
export const FETCH_COMMENT_DATA_RES = 'FETCH_COMMENT_DATA_RES'

export let markScrollY = pos => ({
    type: MARK_SCROLL_Y, //markScrollY
    pos
})


let fetchHomeDataReq = () => ({
    type: FETCH_HOME_DATA_REQ
})

let fetchHomeDataRes = data => ({
    type: FETCH_HOME_DATA_RES,
    stories: data.stories
})

let fetchDetailDataReq = () => ({
    type: FETCH_DETAIL_DATA_REQ
})

let fetchDetailDataRes = data => ({
    type: FETCH_DETAIL_DATA_RES,
    content: data.body
})

let fetchNextlDataReq = () => ({
    type: FETCH_NEXT_DATA_REQ
})

let fetchNextDataRes = data => ({
    type: FETCH_NEXT_DATA_RES,
    stories: data.stories,
    loading: false
})


export let fetchingNextData = loading => ({
    type: FETCHING_NEXT_DATA,
    loading
})

export let fetchHomeData = (cb) => {
    return dispatch => {
        dispatch(fetchHomeDataReq())
        fetch('http://111.230.139.105/api/zhihu/news/latest')
                .then(res=>{
                return res.json();
                })
                .then(data=>{
                    dispatch(fetchHomeDataRes(data))
                    setTimeout(()=> {cb()} ,300)
                    
                })
                .catch((e)=>{
                    new Error(e)
                })
    }
}

export let fetchDetailData = articleId => {
    return dispatch => {
        dispatch(fetchDetailDataReq())
        fetch( `http://111.230.139.105/api/zhihu/news/${articleId}`)
            .then(res=>res.json())
            .then(data=>{
                dispatch(fetchDetailDataRes(data))
            })
            .catch((e)=>{
                new Error(e)
            })
    }
}

export let fetchNextData = date => {
    return dispatch => {
        dispatch(fetchNextlDataReq())
        fetch(`http://111.230.139.105/api/zhihu/news/before/${date}`)
                .then(res=>{
                return res.json();
                })
                .then(data=>{
                    console.log(data);
                    dispatch(fetchNextDataRes(data))
                })
                .catch((e)=>{
                    new Error(e)
                })
    }
}

//评论列表数据
function requestCommentData() {               //发起请求
  return {
    type: FETCH_COMMENT_DATA_REQ
  }
}

function receiveCommentData(data) {    //接受到请求结果
  return {
    type: FETCH_COMMENT_DATA_RES,
    comments: data.comments,
	leng: data.comments && data.comments.length
  }
}

export function fetchCommentData(articleId) {            //将上面两个请求动作连接
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


