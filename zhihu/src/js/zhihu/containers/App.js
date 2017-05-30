import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { getThemesData, getHomeData,getTabData,getNextData,
showLoading, hideLoading,startCalling,stopCalling,
handleDate,handleTab } from '../actions'

import 'es6-promise'
import fetch from 'isomorphic-fetch'
import {getd1} from '../util'

import Nav from '../components/Nav'
import Banner from '../components/Banner'
import LeftSlide from '../components/LeftSlide'
import HomeList from '../components/HomeList'



class App extends Component {

    constructor(props) {
        super(props);


		this.init = this.init.bind(this)
		this.handleTab = this.handleTab.bind(this)
		this.refreshTab = this.refreshTab.bind(this)
		this.openLoginModal = this.openLoginModal.bind(this)
    }


	//获取刚进入时列表
	init() {
		$(document).unbind('scroll');	//解除滚动到底部自动加载

		function s() {
			var banner = document.getElementById('banner');    
			var height = banner.offsetHeight;
			$(document).unbind('scroll').on('scroll', ()=>{
				var top = document.documentElement.scrollTop||document.body.scrollTop;
				if(!this.props.calling){
					// console.log(top + 415)
					// console.log($('#container').height());
					if((top + 390)> $('#container').height()){ 
						this.props.showLoading()
						this.props.handleDate(getd1(this.props.date));
						this.props.getNextData(this.props.date);
					}
				}  
			});
		}

		this.props.getHomeData(s.bind(this));
	}

	//上拉获取下一页数据
	callAjax(){
		this.props.startCalling()
		
	}

	//获取切换栏目后的列表
	handleTab(id){
		this.props.getTabData(id)
	}
    

	//刷新当前主题列表
	refreshTab(){
		if(this.props.tabId){
			this.props.handleTab(this.props.tabId)
		}else{
			this.props.handleTab('')
			this.init()
		}
	}

	//刷新当前主题列表
	openLoginModal(){
		$('.modal').modal();
		$('#modal1').modal('open');
	}

    componentDidMount() {
		$(() => {
			$('.button-collapse').sideNav({
			      menuWidth: 300, 
			      edge: 'left', 
			      closeOnClick: true, 	// Closes side-nav on <a> clicks, useful for Angular/Meteor
			      draggable: true 		// Choose whether you can drag to open on touch screens
			    }
			  );
			this.init();
			this.props.getThemesData();
		})
    }

	componentWillUnmount (){
		$(document).unbind('scroll');	//解除滚动到底部自动加载
	}

    render() {

        return (
            <div id="content">
                <Nav refreshTab={this.refreshTab}/>
                <div id="modal1" className="modal">
                    <div className="modal-content">
                    <h4>请登录</h4>
                    </div>
                    <div className="modal-footer">
                    <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">登录</a>
                    </div>
                </div>
                <ul id="dropdown1" className="dropdown-content z-depth-5">
                    <li><a onClick={this.openLoginModal}>夜间模式</a></li>
                    <li><a onClick={this.openLoginModal}>设置选项</a></li>
                </ul>
                <LeftSlide 
					themes={this.props.themes} 
					handleTab={this.handleTab} 
					refreshHomePage={this.init}
					/>
                <div id="scrollArea">
                    <Banner top_stories={this.props.top_stories} />
                    <HomeList 
						stories={this.props.stories}
						loading={this.props.loading}
						/>
                </div>
		    </div>
      );
    }
}

const mapStateToProps = (state) => ({
			themes: state.themes,
			top_stories: state.top_stories,
			stories: state.stories,
			loading: state.loading,
			calling: state.calling,
			date: state.date,
			tabId: state.tabId,
		});

const mapDispatchToProps = dispatch => ({
    getThemesData: () => {
		dispatch(getThemesData())
	},
	getHomeData: (cb) => {
		dispatch(getHomeData(cb))
	},
	getTabData: (tabId) => {		
		dispatch(getTabData(tabId))
	},
	getNextData: (date) => {		
		dispatch(getNextData(date))
	},
	showLoading: () => {
		dispatch(showLoading())
	},
	hideLoading: () => {
		dispatch(hideLoading())
	},
	startCalling: () => {
		dispatch(startCalling())
	},
	stopCalling: () => {
		dispatch(stopCalling())
	},
	handleDate: (date) => {
		dispatch(handleDate(date))
	},
	handleTab: (tabId) => {
		dispatch(handleTab(tabId))
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

