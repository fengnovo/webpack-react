import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchCommentData,fetchDetailData } from './actions'

class Detail extends React.Component {
    constructor (props) {
        super(props)
        if(this.props && this.props.params && this.props.params.id){
           this.articleId = this.props.params.id; 
        }
        this.handleClick  = this.handleClick.bind(this)
    }

    componentWillMount () {
        if(this.props.content == ''){
            this.props.fetchDetailData(this.articleId)
        }
    }

    componentDidMount () {
        window.scrollTo(0,0);
    }

    handleClick (){
        this.props.fetchCommentData(this.articleId)
    }

    render () {
        return (
            <div>
                <p><Link to={ '/comment/'+this.articleId}  onClick={this.handleClick.bind(this) }>评论</Link></p>
                <div id="detail-content" dangerouslySetInnerHTML={{__html: this.props.content}}></div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    content: state.detail.content,
})

const mapDispatchToProps = (dispatch) => ({
    fetchCommentData: articleId => dispatch(fetchCommentData(articleId)),
    fetchDetailData: articleId => dispatch(fetchDetailData(articleId)),
})

export default connect(mapStateToProps,mapDispatchToProps)(Detail)
