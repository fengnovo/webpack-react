import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { fetchCommentData } from './actions'
class Comment extends React.Component {

    constructor(props) {
        super(props);
        if(this.props.params && this.props.params.id){
           this.articleId = this.props.params.id; 
        }

		// this.handleClick = this.handleClick.bind(this)
    }

	handleClick(){
		// window.history.back()
	}

    componentWillMount () {
        if(this.props.comments.length == 0){
            this.props.fetchCommentData(this.articleId)
        }
    }
	
    componentDidMount() {
        window.scrollTo(0,0); 
    }

	renderComment(){
		let comments = this.props.comments;
        return comments.map((item,i) => <li key={i}>
									<img src={item.avatar} alt={item.author} />
									<div>
										<span>{item.author}</span>
										<p>{item.content}</p>
										<span>{item.time}</span>
									</div>
								</li>)
	}

    render() {

        return (
            <div id="comment">
			<p><span id="commentLength">{this.props.leng}</span>条短评论</p>
			<ul id="comment-content">
				{this.renderComment()}
			</ul>
		</div>
      );
    }
}

const mapStateToProps = state => {
    console.log(state); 
    return {
    comments: state.comment.comments,
    leng: state.comment.leng,
}}

const mapDispatchToProps = dispatch => ({
    fetchCommentData: articleId => dispatch(fetchCommentData(articleId))
})

export default connect(mapStateToProps,mapDispatchToProps)(Comment)
