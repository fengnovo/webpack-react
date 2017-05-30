import React, { Component } from 'react'
import PropTypes from 'prop-types'

import fetch from 'isomorphic-fetch'
import Loading from './Loading'
import {imgUrl} from '../util'

class HomeList extends Component {
    static propTypes = {
        stories: PropTypes.array,
        loading: PropTypes.bool
    }

    constructor(props) {
        super(props);
        this.renderStories = this.renderStories.bind(this)
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    renderStories () {
        let stories = this.props.stories;
    //    console.log(stories);
    
        return stories.map((item,i) => {
            if(item.images && item.images.length>0){
                return  <li className="p-5 waves-effect c-radius z-depth-1" key={i}>
                                            <a href={"/detail/"+item.id}>
                                                <p className="m-r-1">{item.title}</p>
                                                <img src={imgUrl(item.images[0])} alt={item.title} />
                                            </a>
                                        </li>
            }else{
                return  <li className="p-5 waves-effect c-radius z-depth-1" key={i}>
                                            <a href={"/detail/"+item.id}>
                                                <p style={{ 'margin': 0,'width': '100%'}}>{item.title}</p>
                                            </a>
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