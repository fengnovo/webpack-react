import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { fetchDetailData } from './actions'

class Detail extends React.Component {
    constructor (props) {
        super(props)
        if(this.props && this.props.params && this.props.params.id){
           this.articleId = this.props.params.id; 
        }

    }

    componentDidMount () {
    //    fetch('http://139.199.79.18/api/zhihu/'+this.articleId)
    //         .then(res=>res.json())
    //         .then(data=>{
    //             console.log(data)
    //             this.setState({
    //                 content: data.body
    //             })
    //         })
        this.props.fetchDetailData(this.articleId)
    }

    render () {
        return (
            <div><div id="detail-content" dangerouslySetInnerHTML={{__html: this.props.content}}></div></div>
        )
    }
}

const mapStateToProps = state => ({
    content: state.detail.content
})

const mapDispatchToProps = dispatch => ({
    fetchDetailData:(articleId) => dispatch(fetchDetailData(articleId))
})

export default connect(mapStateToProps,mapDispatchToProps)(Detail)
