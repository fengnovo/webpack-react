import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import {imgUrl} from '../util'

class Banner extends Component {
    static propTypes = {
        top_stories: PropTypes.array
    }

    constructor(props) {
        super(props);
        this.renderBanner = this.renderBanner.bind(this)
    }   
    
    refreshBanner () {
        $(this.refs.bannerSlider).slider({
            height: '14rem'
        })
    }

    componentDidMount() {
        setTimeout(()=>{
            this.refreshBanner();
        },1000)
    }

    componentWillReceiveProps () {
        // this.refreshBanner();
    }

    renderBanner () {
        let top_stories = this.props.top_stories;
        return top_stories.map((item,i) => <li key={i}>
                                                <Link to={"/detail/"+item.id} 
                                                    onClick={this.props.getDetailData.bind(this,item.id)}>
                                                <img src={imgUrl(item.image)} alt={item.title} />
                                                <div className="caption center-align">
                                                <h5 className="light grey-text text-lighten-3 banner-text">{ item.title }</h5>
                                                </div>
                                                </Link>
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