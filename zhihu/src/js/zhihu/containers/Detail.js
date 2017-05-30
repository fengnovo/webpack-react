import React from 'react'
import { connect } from 'react-redux'

import {imgUrl} from '../util'
import Loading from '../components/Loading'
import {getDetailData} from '../actions'

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
        this.insert_comment = this.insert_comment.bind(this)
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

    insert_comment(){
        console.log('insert_comment');
        window.location.href = `/comment/${this.articleId}`
    }

    thumb_up(){
        console.log('thumb_up');
    }

    componentDidMount (){
        $(() => {
            this.props.getDetailData(this.articleId)
        })
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
							<li><a className="waves-effect waves-light"><i className="material-icons" onClick={this.insert_comment}>insert_comment</i></a></li>
							<li><a className="waves-effect waves-light"><i className="material-icons" onClick={this.thumb_up}>thumb_up</i></a></li>
						</ul>
						
					</div>
				</nav>
			</div>
			{this.props.loading ? <div className="detail-loading"><Loading /></div> : <div id="detail-content" dangerouslySetInnerHTML={{__html: this.props.content}}></div>} 
		</div>
    }
}

const mapStateToProps = state => ({
    loading: state.detail.loading,
    content: state.detail.content
})

const mapDispatchToProps = dispatch => ({
    getDetailData: articleId => dispatch(getDetailData(articleId))
    
})

Detail = connect(mapStateToProps,mapDispatchToProps)(Detail)

export default Detail