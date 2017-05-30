import React, { Component } from 'react'
import PropTypes from 'prop-types'

import 'es6-promise'
import fetch from 'isomorphic-fetch'
import {getd1} from './util'

import Nav from './components/Nav'
import Banner from './components/Banner'
import LeftSlide from './components/LeftSlide'
import HomeList from './components/HomeList'



class App extends Component {

    constructor(props) {
        super(props);

		this.isCalling = false;
		this.date = 20170520;
		this.tabId = '';
		this.cacheData={};	//做数据缓存
		this.scrollH = 0;

		this.state = {
			themes: [],
			loading: true,
			top_stories: [],
			stories: []
		}

		this.init = this.init.bind(this)
		this.getThemesData = this.getThemesData.bind(this)
		this.callAjax = this.callAjax.bind(this)
		this.handleTab = this.handleTab.bind(this)
		this.refreshTab = this.refreshTab.bind(this)
		this.s = this.s.bind(this)
		this.uns = this.uns.bind(this)
		this.openLoginModal = this.openLoginModal.bind(this)
    }
 

	//获取刚进入时列表
	init() {
		this.tabId = '';
		this.uns(); 	//滚动到顶部
		//首次请求
		fetch('http://111.230.139.105/api/zhihu//news/latest')
			.then(res=>{
				return res.json();
			})
			.then(data=>{
				this.date = data.date;
				this.setState({
					loading: false,
					top_stories: data.top_stories,
					stories: data.stories
				})
				this.s();
				this.props.updateData('data',data);
				setTimeout(() => {
					this.isCalling = false;
				},300);
			})
			.catch((e)=>{
				new Error(e)
				this.setState({
					loading: false
				})
			})
	}

	//获取左滑栏栏目
	getThemesData () {
		fetch('http://111.230.139.105/api/zhihu/themes')
			.then(res=>{
				return res.json()
			})
			.then(data=>{
				this.setState({
					themes: data.others
				})
			})
			.catch(e=>{
				new Error(e)
				this.setState({
					loading: false
				})
			})
	}

	//上拉获取下一页数据
	callAjax(){
		this.isCalling = true;
		fetch('http://111.230.139.105/api/zhihu/news/before/' + this.date)
			.then(res=>{
				return res.json();
			})
			.then(data=>{
				let arr = this.state.stories.concat(data.stories);
				// console.log(arr);
				this.setState({
					loading: false,
					stories: arr
				})
				console.log(this.props.cacheData);
				this.props.pushData('stories',arr.slice());	//clone一份存储
				setTimeout(() => {
					this.isCalling = false;
				},300);
			})
			.catch(e=>{
				new Error(e)
				this.setState({
					loading: false
				})
			})
	}

	//获取切换栏目后的列表
	handleTab(id){
		this.tabId = id;
		fetch('http://111.230.139.105/api/zhihu/theme/'+id)
			.then(res=>{
				return res.json()
			})
			.then(data=>{
				$('html,body').animate({ scrollTop: 0 }, 0);
				this.setState({
					loading: false,
					stories: data.stories
				})
				this.props.updateData('stories',data.stories);	//clone一份存储
				console.log({
					loading: false,
					stories: data.stories
				});
				this.uns();
			})
			.catch(e=>{
				new Error(e)
			})
			
	}
    
	//滚动到底部自动加载下一页
	s() {
		var banner = document.getElementById('banner');    
		var height = banner.offsetHeight;
		$(document).unbind('scroll').on('scroll', ()=>{
			var top = document.documentElement.scrollTop||document.body.scrollTop;
			if(!this.isCalling){
				console.log(top + 415)
				this.scrollH = top + 415
				// console.log($('#container').height());
				if((top + 390)> $('#container').height()){ 
					this.setState({
						loading: true
					})
					this.date = getd1(this.date);
					this.callAjax();
				}
			}  
		});
	}

	//解除滚动到底部自动加载
	uns() {
		$(document).unbind('scroll');
	}

	//刷新当前主题列表
	refreshTab(){
		if(this.tabId){
			this.handleTab(this.tabId)
		}else{
			this.init()
		}
	}

	//刷新当前主题列表
	openLoginModal(){
		$('.modal').modal();
		$('#modal1').modal('open');
	}

    componentDidMount() {
		debugger
		var dsfkjsdlk = this.props.cacheData;
		console.log(dsfkjsdlk);
		console.log(dsfkjsdlk.data);
		$(() => {
			$('.button-collapse').sideNav({
			      menuWidth: 300, 
			      edge: 'left', 
			      closeOnClick: true, 	// Closes side-nav on <a> clicks, useful for Angular/Meteor
			      draggable: true 		// Choose whether you can drag to open on touch screens
			    }
			  );
			if(!this.props.cacheData.data){	//如果没有缓存数据就请求后台
				this.init();
			}else{
				let data = this.props.cacheData.data;
				console.log(data);
				
				this.date = data.date;
				this.setState({
					loading: false,
					top_stories: data.top_stories,
					stories: data.stories
				})
				this.s();
				setTimeout(() => {
					if(this.props.cacheData.scrollH){
						$('html,body').animate({ scrollTop: this.props.cacheData.scrollH}, 0);
					}
					this.isCalling = false;
				},300);
			}
			this.getThemesData();
		})
    }

	componentWillUnmount (){
		debugger
		alert('2');
		this.props.updateData('scrollH',this.scrollH)
		this.uns();
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
					themes={this.state.themes} 
					handleTab={this.handleTab} 
					refreshHomePage={this.init}
					/>
                <div id="scrollArea">
                    <Banner top_stories={this.state.top_stories} />
                    <HomeList 
						stories={this.state.stories}
						loading={this.state.loading}
						/>
                </div>
		    </div>
      );
    }
}

export default App
