import React from 'react'
import {imgUrl} from './util'
import Loading from './components/Loading'

class Detail extends React.Component {
    constructor (props) {
        super(props)
        console.log(this.props.match.params.id);
        if(this.props.match && this.props.match.params && this.props.match.params.id){
           this.articleId = this.props.match.params.id; 
        }

        this.state = {
            loading: true,
            content: ''
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
            fetch(`http://111.230.139.105/api/zhihu/news/${this.articleId}`)
                .then(res=>{
                    return res.json()
                })
                .then(data=>{
                    console.log(data);
                    if(data.css){
                        $('<link type="text/css" rel="stylesheet" href='+data.css+' />').appendTo('head'); 
                        setTimeout(()=>{
                            this.setState({
                                // loading: false
                            })
                        },5000)
                    }
                    var _html = '';
                    if(data.image){
                        _html += '<div class="banner" style="background-image:url('+imgUrl(data.image)+')">'
                                +'<span class="title">'+data.title+'</span>'
                                +'</div>';
                    }
                    _html += '<div>'+data.body+'</div>';
                    this.setState({
                        content: _html
                    })
                    
                    setTimeout(()=>{
                        $('#detail-content img').map(function(i,item){
                            // console.log(item)
                            var x = imgUrl($(item).attr('src'));
                            $(item).attr('src',x);
                        });
                         
                    },300)
                    $('.img-place-holder').remove();
                })
                .catch(e=>{
                    new Error(e)
                })
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
			{this.loading ? <div className="detail-loading"><Loading /></div> : <div id="detail-content" dangerouslySetInnerHTML={{__html: this.state.content}}></div>} 
		</div>
    }
}

export default Detail