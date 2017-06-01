import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {Link} from 'react-router-dom'
import Loading from './Loading'
import {imgUrl} from '../util'

class HomeList extends Component {
    static propTypes = {
        stories: PropTypes.array,
        loading: PropTypes.bool,
        getDetailData: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.renderStories = this.renderStories.bind(this)
    }



    renderStories () {
        let stories = this.props.stories;

        return stories.map((item,i) => {
            if(item.images && item.images.length>0){
                return  <li className="p-5 waves-effect c-radius z-depth-1" key={i}>
                                            <Link to={"/detail/"+item.id} onClick={this.props.getDetailData.bind(this,item.id)}>
                                                <p className="m-r-1">{item.title}</p>
                                                <img src={imgUrl(item.images[0])} alt={item.title} />
                                            </Link>
                                        </li>
            }else{
                return  <li className="p-5 waves-effect c-radius z-depth-1" key={i}>
                                            <Link to={"/detail/"+item.id} onClick={this.props.getDetailData.bind(this,item.id)}>
                                                <p style={{ 'margin': 0,'width': '100%'}}>{item.title}</p>
                                            </Link>
                                        </li>
            }
        })
    }

    render() {
        return (
            <div id="container">
                <ul id="list">
                    {this.renderStories()}
                </ul>
                {this.props.loading ? <Loading /> : null}
            </div>
        );
    }
}

export default HomeList