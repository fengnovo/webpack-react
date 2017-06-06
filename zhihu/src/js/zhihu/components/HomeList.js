import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {Link} from 'react-router-dom'
import Loading from './Loading'
import { imgUrl, getd1, getd2, getd3 } from '../util'

let today = getd3(getd2(new Date()))

class HomeList extends Component {
    static propTypes = {
        stories: PropTypes.array,
        loading: PropTypes.bool,
        getDetailData: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.renderStories = this.renderStories.bind(this)
        this.handleLink = this.handleLink.bind(this)
    }

    handleLink (id) {
        this.props.getDetailData(id) //不能在自己这连调用一次以上props的dispatch
    }

    renderStories () {
        let stories = this.props.stories;
        let lis =  stories.map((item,i) => {
            // console.log(item.date);
            if(item.date){
                // console.log('item.date'+item.date);
                // console.log('today'+today);
                let text = (today == item.date) ? '今日热闻': item.date
                return <li className="stories-tip" key={ (this.props.date +i)}>{text}</li> 
            }else {
                if(item.images && item.images.length>0){
                    return  <li className="p-5 waves-effect c-radius z-depth-1" key={i}>
                                <Link to={"/detail/"+item.id} 
                                    onClick={this.handleLink.bind(this,item.id)}>
                                    <p className="m-r-1">{item.title}</p>
                                    <img src={imgUrl(item.images[0])} alt={item.title} />
                                </Link>
                            </li>
                }else{
                    return  <li className="p-5 waves-effect c-radius z-depth-1" key={i}>
                                <Link to={"/detail/"+item.id} onClick={this.handleLink.bind(this,item.id)}>
                                    <p style={{ 'margin': 0,'width': '100%'}}>{item.title}</p>
                                </Link>
                            </li>
                }
            }
        })
        return lis;
    }

    renderStoriesUl () {
        return <ul id="list">
                    {this.renderStories()}
                </ul>
    }

    render() {
        return (
            <div id="container">
                {this.renderStoriesUl()}
                {this.props.loading ? <Loading /> : null}
            </div>
        );
    }
}

export default HomeList