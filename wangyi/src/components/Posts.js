import React, { PropTypes } from 'react'

const Posts = ({posts}) => (
  <ul style={{'margin': '0', 'padding': '0'}}>
    {posts.map((post, i) =>
      <li key={i} style={{'height':'4rem','listStyle':'none','marginBottom': '.5rem'}}>
        <img style={{'width':'6rem','height':'4rem','float': 'left'}} src={post.imgurl}/>
        <a href={post.docurl} style={{'textDecoration': 'none','fontSize':'1rem'}}>{post.title}</a>
      </li>
    )}
  </ul>
)

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}

export default Posts
