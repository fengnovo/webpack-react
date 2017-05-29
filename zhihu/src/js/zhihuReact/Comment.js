import React, { Component } from 'react'
import PropTypes from 'prop-types'

import 'es6-promise'
import fetch from 'isomorphic-fetch'
import {imgUrl, changeTime} from './util'

import Nav from './components/Nav'
import Banner from './components/Banner'
import LeftSlide from './components/LeftSlide'
import HomeList from './components/HomeList'



class Comment extends Component {

    constructor(props) {
        super(props);
		console.log(this.props.match.params.id);
        if(this.props.match && this.props.match.params && this.props.match.params.id){
           this.articleId = this.props.match.params.id; 
        }
		this.state = {
			leng: 0,
			comments: []
		}

		this.handleClick = this.handleClick.bind(this)
    }

	handleClick(){
		window.history.back()
	}
	
    componentDidMount() {
		$(() => {
			console.log(location.search.slice(4));

			fetch(`http://111.230.139.105/api/zhihu/story/${this.articleId}/short-comments`)
				.then(res=>{
					return res.json()
				})
				.then(data=>{
					var comments = data.comments;
					// if(comments && comments.length>0){
					// 	$('#commentLength').text(comments.length);
					// 	var li = '';
					// 	comments.forEach(function (item) {
					// 		li+= '<li className="p-5 waves-effect">'
					// 			+'  <img src=' + imgUrl(item.avatar) + ' alt="" />'
					// 			+'	<div className="m-l-7">'
					// 			+'		<span className="name">' + item.author + '</span>'
					// 			+'		<p className="m-r-1">' + item.content + '</p>'
					// 			+'		<span className="time">' + changeTime(item.time) + '</span>'
					// 			+'	</div>'
					// 			+'</li>';
					// 	});
					// 	$('#comment-content').html(li);
					// }else{
					// 	$('#commentLength').text(0);
					// }
					this.setState({
						comments: comments,
						leng: comments && comments.length
					})
				})
		})
    }

	renderComment(){
		let comments = this.state.comments;
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
						<a href="#!" className="left-align"><span id="commentLength">{this.state.leng}</span>条短评论</a>
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

export default Comment
