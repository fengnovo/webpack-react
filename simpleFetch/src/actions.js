import fetch from 'isomorphic-fetch'

export const FETCH_HOME_DATA_REQ = 'FETCH_HOME_DATA_REQ'
export const FETCH_HOME_DATA_RES = 'FETCH_HOME_DATA_RES'
export const FETCH_DETAIL_DATA_REQ = 'FETCH_DETAIL_DATA_REQ'
export const FETCH_DETAIL_DATA_RES = 'FETCH_DETAIL_DATA_RES'
export const FETCH_NEXT_DATA_REQ = 'FETCH_NEXT_DATA_REQ'
export const FETCH_NEXT_DATA_RES = 'FETCH_NEXT_DATA_RES'
export const FETCHING_NEXT_DATA = 'FETCHING_NEXT_DATA'

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
        fetch( `http://139.199.79.18/api/zhihu/${articleId}`)
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
        fetch(`http://139.199.79.18/api/zhihu/before/${date}`)
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