export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_REDDIT = 'SELECT_REDDIT'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'

export const selectReddit = reddit => ({
  type: SELECT_REDDIT,      //选择
  reddit
})

export const invalidateReddit = reddit => ({
  type: INVALIDATE_REDDIT,  //使之无效
  reddit
})

export const requestPosts = reddit => ({
  type: REQUEST_POSTS,      //post请求
  reddit
}) 

export const receivePosts = (reddit, json) => ({
  type: RECEIVE_POSTS,      //接收请求
  reddit,
  posts: json.data.children.map(child => child.data),
  receivedAt: Date.now()
})

const fetchPosts = reddit => dispatch => {
  console.log('fetchPosts');
  console.log('fetchPosts------1');
  dispatch(requestPosts(reddit))
  return fetch(`https://www.reddit.com/r/${reddit}.json`)
    .then(response => response.json())
    .then(json => {
      console.log('receivePosts------1');
      dispatch(receivePosts(reddit, json));
    })
}

const shouldFetchPosts = (state, reddit) => {   //判断要不要刷新
  console.log('shouldFetchPosts');
  const posts = state.postsByReddit[reddit]
  if (!posts) {                   //如果数据是空的，就返回true
    return true
  }
  if (posts.isFetching) {         //如果正在刷新就返回false
    return false
  }
  return posts.didInvalidate    
}
/*{
  postsByReddit : {
          'reactjs':{
              isFetching: false,
              didInvalidate: false,
              items: []
            }
        } ,
  selectedReddit : 'reactjs'
}*/
export const fetchPostsIfNeeded = reddit => (dispatch, getState) => {
  console.log('fetchPostsIfNeeded');
  if (shouldFetchPosts(getState(), reddit)) {
    return dispatch(fetchPosts(reddit))
  }
}
