import React, { Component } from 'react'
import PropTypes from 'prop-types'

class LeftSide extends Component {
    static propTypes = {
        themes: PropTypes.array,
        handleTab: PropTypes.func,
        refreshHomePage: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.renderThemes = this.renderThemes.bind(this);
        this.handleTab = this.handleTab.bind(this);
    }

    handleTab (id) {
        this.props.handleTab(id);
    }


    renderThemes() {
        let themes = this.props.themes;
        return themes.map((item,i) => <li key={i}><a onClick={this.handleTab.bind(this,item.id)} className="waves-effect">{item.name}</a></li>)
    }

    render() {
        return (
            <ul id="slide-out" className="side-nav">
				<li className="light-blue">
					<a className="waves-effect waves-light">
						<img className="circle slide-left" src="https://avatars3.githubusercontent.com/u/9670320" />
						<span className="color-white">fengnovo</span>
					</a>
				</li>
				<li className="light-blue">
					<a className="waves-effect waves-light i-b">
						<span className="color-white"><i className="material-icons slide-left-icon">star</i>我的收藏</span>
					</a>
					<a className="waves-effect waves-light i-b">
						<span className="color-white"><i className="material-icons slide-left-icon">file_download</i>离线下载</span>
					</a>
				</li>
				<li onClick={this.props.refreshHomePage}>
                    <a className="waves-effect">
					    <span className="color-blue">
                            <i className="material-icons slide-left-icon slide-left-icon-home">home</i>首页
                        </span>
                    </a>
				</li>
                {this.renderThemes()}
			</ul>
      );
    }
}

export default LeftSide