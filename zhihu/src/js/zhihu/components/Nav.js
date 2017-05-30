import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Nav extends Component {
    static propTypes = {
        refreshTab: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.refreshHome = this.refreshHome.bind(this);
    }

    refreshHome() {
        this.props.refreshTab()
    }

    render() {
        return (
            <div className="navbar-fixed">
				<nav className="light-blue">
					<div className="nav-wrapper">
						<a href="#!" className="left-align">首页</a>
						<ul className="right">
							<li><a href="#modal1" className="waves-effect waves-light"><i className="material-icons">notifications</i></a></li>
							<li onClick={this.refreshHome}><a href="#" className="waves-effect waves-light"><i className="material-icons">refresh</i></a></li>
							<li><a className="dropdown-button waves-effect waves-light" href="#!" data-activates="dropdown1"><i className="material-icons">more_vert</i></a></li>
						</ul>

						<a href="#" data-activates="slide-out" className="waves-effect waves-light button-collapse"><i className="material-icons">menu</i></a>
					</div>
				</nav>
			</div>
      );
    }
}

export default Nav