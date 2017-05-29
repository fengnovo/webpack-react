import React, { Component } from 'react'
import PropTypes from 'prop-types'

import fetch from 'isomorphic-fetch'
import {imgUrl} from '../util'

class Banner extends Component {
    static propTypes = {
        top_stories: PropTypes.array
    }

    constructor(props) {
        super(props);
        this.renderBanner = this.renderBanner.bind(this)
    }   
    
    componentDidMount() {
        // if(this.props.top_stories && this.props.top_stories.length>0){
            setTimeout(()=>{
                $(this.refs.bannerSlider).slider({
                    height: '14rem'
                })
            },300)
        // }
    }

    renderBanner () {
        let top_stories = this.props.top_stories;
        return top_stories.map((item,i) => <li key={i}>
                                                <a href={"/detail/"+item.id}>
                                                <img src={imgUrl(item.image)} alt={item.title} />
                                                <div className="caption center-align">
                                                <h5 className="light grey-text text-lighten-3 banner-text">{ item.title }</h5>
                                                </div>
                                                </a>
                                            </li>)
    }

    render() {
        return (
            <div className="slider" ref='bannerSlider'>
                <ul className="slides" id="banner">
                    {this.renderBanner()}
                </ul>
            </div>
      );
    }
}

export default Banner