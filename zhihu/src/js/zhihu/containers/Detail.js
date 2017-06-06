import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

import {imgUrl} from '../util'
import Loading from '../components/Loading'
import {getDetailData,getCountData,getCommentData} from '../actions'

class Detail extends React.Component {
    constructor (props) {
        super(props)
        console.log(this.props.match.params.id);
        if(this.props.match && this.props.match.params && this.props.match.params.id){
           this.articleId = this.props.match.params.id; 
        }


        this.back = this.back.bind(this)
        this.share = this.share.bind(this)
        this.star = this.star.bind(this)
        this.thumb_up = this.thumb_up.bind(this)
    }

    back(){
		window.history.back();
	}

	share(){
        console.log('share');
    }

    star(){
        console.log('star');
    }

    thumb_up(){
        console.log('thumb_up');
    }

    componentDidMount (){
        $(() => {
            window.scrollTo(0,0)
            if(this.props.content == ''){
                this.props.getDetailData(this.articleId)
                this.props.getCountData(this.articleId)
            }else {
				setTimeout(()=>{
                    if(this.props.css){
                        $('[data-cssname=cssKey]').remove()
                        $('<link data-cssname="cssKey" type="text/css" rel="stylesheet" href='+this.props.css+' />').appendTo('head') 
                    }
					$('.img-place-holder').remove();
					$('#detail-content img').map(function(i,item){
						// console.log(item)
						var x = imgUrl($(item).attr('src'));
						$(item).attr('src',x);
					});
						
				},300)
			}
        })
    }

    componentWillUnmount (){
		$('[data-cssname=cssKey]').remove()	//卸载样式
	}

    render () {
        return <div id="detail">
			<div className="navbar-fixed">
				<nav className="light-blue">
					<div className="nav-wrapper">
						<ul className="left">
							<li><a className="waves-effect waves-light" onClick={this.back}><i className="material-icons">arrow_back</i></a></li>
						</ul>
						<ul className="right">
							<li><a className="waves-effect waves-light"><i className="material-icons" onClick={this.share}>share</i></a></li>
							<li><a className="waves-effect waves-light"><i className="material-icons" onClick={this.star}>star</i></a></li>
							<li>
                                <Link to={"/comment/"+this.articleId} 
                                        onClick={this.props.getCommentData.bind(this,this.articleId)} 
                                        className="waves-effect waves-light">
                                        <i className="material-icons comment-count-icon">insert_comment</i>
                                        <span className="comment-count">{this.props.comments}</span>
                                </Link></li>
							<li><a className="waves-effect waves-light">
                                <i className="material-icons comment-count-icon" onClick={this.thumb_up}>thumb_up</i>
                                <span className="comment-count">{this.props.popularity}</span>
                                </a></li>
						</ul>
						
					</div>
				</nav>
			</div>
			{this.props.loading ? <div className="detail-loading"><Loading /></div> : <div id="detail-content" dangerouslySetInnerHTML={{__html: this.props.content}}></div>} 
		</div>
    }
}

const mapStateToProps = state => ({ ...state.detail })


const mapDispatchToProps = dispatch => ({
    getDetailData: articleId => dispatch(getDetailData(articleId)),
    getCountData: articleId => dispatch(getCountData(articleId)),
    getCommentData: articleId => dispatch(getCommentData(articleId))
})

Detail = connect(mapStateToProps,mapDispatchToProps)(Detail)

export default Detail