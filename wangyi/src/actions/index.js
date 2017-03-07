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
  posts: json.list,
  receivedAt: Date.now()
})

const fetchPosts = newsType => dispatch => {
  dispatch(requestPosts(newsType))
  return fetch(`http://wangyi.butterfly.mopaasapp.com/news/api?type=${newsType}&page=1&limit=30`)
    .then(response => response.json())
    .then(json => {
        dispatch(receivePosts(newsType, json))
      }
    )
}

const shouldFetchPosts = (state, reddit) => {
  const posts = state.postsByReddit[reddit]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchPostsIfNeeded = reddit => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), reddit)) {
    return dispatch(fetchPosts(reddit))
  }
}
