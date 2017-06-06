import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import 'es6-promise'
import fetch from 'isomorphic-fetch'
import {imgUrl, changeTime} from '../util'

import {getCommentData} from '../actions'


class Comment extends Component {

    constructor(props) {
        super(props);
		console.log(this.props.match.params.id);
        if(this.props.match && this.props.match.params && this.props.match.params.id){
           this.articleId = this.props.match.params.id; 
        }

		this.handleClick = this.handleClick.bind(this)
    }

	handleClick(){
		window.history.back()
	}
	
    componentDidMount() {
		$('[data-cssname=cssKey]').remove()	//卸载样式
		$(() => {
			
			window.scrollTo(0,0)
			if(this.props.comments && this.props.comments.length == 0){
                this.props.getCommentData(this.articleId)
            }
		})
    }

	renderComment(){
		let comments = this.props.comments;
        return comments.map((item,i) => <li className="p-5 waves-effect" key={i}>
									<img src={imgUrl(item.avatar)} alt={item.author} />
									<div className="m-l-7">
										<span className="name">{item.author}</span>
										<p className="m-r-1">{item.content}</p>
										<span className="time">{changeTime(item.time)}</span>
									</div>
								</li>)
	}

    render() {

        return (
            <div id="comment">
			<div className="navbar-fixed">
				<nav className="light-blue">
					<div className="nav-wrapper">
						<ul className="left">
							<li><a className="waves-effect waves-light" onClick={this.handleClick}><i className="material-icons">arrow_back</i></a></li>
						</ul>
						<a href="#!" className="left-align"><span id="commentLength">{this.props.leng}</span>条短评论</a>
						<ul className="right">
							<li><a className="waves-effect waves-light"><i className="material-icons">border_color</i></a></li>
						</ul>
						
					</div>
				</nav>
			</div>
			<ul id="comment-content">
				{this.renderComment()}
			</ul>
		</div>
      );
    }
}

const mapStateToProps = state => ({...state.comments})

const mapDispatchToProps = (dispatch) => ({
	getCommentData: (articleId) =>{
		dispatch(getCommentData(articleId))
	} 
})

Comment = connect(mapStateToProps,mapDispatchToProps)(Comment)

export default Comment
