import React, { Component } from 'react';

import fetch from 'isomorphic-fetch'

// import Nav from './components/Nav'
// import Banner from './components/Banner'
// import LeftSlide from './components/LeftSlide'
// import HomeList from './components/HomeList'

class App extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this)
    }

    componentWillMount() {

    }
    
    componentDidMount() {
        function getd2(newD){
			newD = new Date(newD)
			function f(x){
				return x > 9 ? x : '0'+x
			}
			return newD.getFullYear()+''+f(newD.getMonth()+1)+''+f(newD.getDate())
		}

		function getd1(da){ //20170520
			da = da+'';
			var y = da.slice(0,4);
			var m = da.slice(4,6);
			var d = da.slice(6,8);
			// console.log(y,m,d)
			// console.log(new Date(y,m-1,d).getTime())
			// console.log(getd2(new Date(y,m-1,d).getTime()))

			var preDa = new Date(y,m-1,d).getTime() - 86400000;

			console.log(getd2(preDa))
			return getd2(preDa)
			
		}


		function imgUrl(url) {
			if(url.indexOf('zhimg.com')!=-1){
				return 'http://111.230.139.105:9999'+url.slice(url.indexOf('zhimg.com')+9)
			}else{
				return url
			}
		}

		function uns() {
			$(document).unbind('scroll');
		}

		function handleTab(id){
			// event.preventdefault();
			$('#loading').show();
			$.ajax({
				url: 'http://111.230.139.105/api/zhihu/theme/'+id,
				success: function (data) {
					$('html,body').animate({ scrollTop: 0 }, 0);
					$('#loading').hide();
					// console.log(data)
					// zhihuData[date] = data.stories;
					// sessionStorage.setItem('zhihu', JSON.stringify(zhihuData));
					var li = '';
					data.stories.forEach(function (item) {
						// li += ('<li><a href="./detail.html?id=' + item.id + '">' + '<img src=' + item.images[0] + ' alt=""/>' + item.title + '</a></li>')
						li+= '<li class="p-5 waves-effect c-radius z-depth-1">'
							+'	<a href="./detail.html?id=' + item.id + '">'
							+'		<p class="m-r-1">' + item.title + '</p>'
							+((item.images && item.images.length>0)?'<img src=' + imgUrl(item.images[0]) + ' alt="" />':'')
							+'	</a>'
							+'</li>';
					})
					$('#list').html(li);
					uns();
					// s();
					// setTimeout(function(){
					// 	isCalling = false;
					// },300);
					
				},
				error: function (data) {

				}
			})
		}

		function login(){

		}
		function refresh(){
			window.location.reload();
		}


		$(function () {
			var zhihuData = {};
			if (sessionStorage.getItem('zhihu')) {
				zhihuData = JSON.parse(sessionStorage.getItem('zhihu'));
			}

			// $(".button-collapse").sideNav();
			$('.button-collapse').sideNav({
			      menuWidth: 300, // Default is 300
			      edge: 'left', // Choose the horizontal origin
			      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
			      draggable: true // Choose whether you can drag to open on touch screens
			    }
			  );
			
			var date = 20170520, isCalling = false;

			function s() {
				// $('#app').height($(window).height());
				var banner = document.getElementById('banner');    
				/*高度*/    
				var height = banner.offsetHeight;
				//  console.log($(document).height());
				$(document).unbind('scroll').on('scroll', function(){
					var top = document.documentElement.scrollTop||document.body.scrollTop;
					// console.log(top);
					if(!isCalling){
						console.log(top + 415);
						console.log($('#container').height());
						if((top + 390)> $('#container').height()){ 
							$('#loading').show();
							// console.log('0');
							date = getd1(date);
							// $('#loading').show();
							callAjax();
						}
					}  
				});
			}

			function callAjax() {
				isCalling = true;
				$.ajax({
					url: 'http://111.230.139.105/api/zhihu/news/before/' + date,
					success: function (data) {
						$('#loading').hide();
						// console.log(data)
						zhihuData[date] = data.stories;
						sessionStorage.setItem('zhihu', JSON.stringify(zhihuData));
						var li = '';
						data.stories.forEach(function (item) {
							// li += ('<li><a href="./detail.html?id=' + item.id + '">' + '<img src=' + item.images[0] + ' alt=""/>' + item.title + '</a></li>')
							li+= '<li class="p-5 waves-effect c-radius z-depth-1">'
								+'	<a href="./detail.html?id=' + item.id + '">'
								+'		<p class="m-r-1">' + item.title + '</p>'
								+'		<img src=' + imgUrl(item.images[0]) + ' alt="" />'
								+'	</a>'
								+'</li>';
						})
						$('#list').append(li);
						s();
						setTimeout(function(){
							isCalling = false;
						},300);
						
					},
					error: function (data) {
						console.log(data);
						$('#loading').hide();
					}
				})
			}
			//首次请求
			$.ajax({
				url: 'http://111.230.139.105/api/zhihu//news/latest',
				success: function (data) {
					console.log(data)
					date = data.date;
					zhihuData[date] = data.stories;
					sessionStorage.setItem('zhihu', JSON.stringify(zhihuData));
					var banners='',li = '';
					data.top_stories.forEach(function (item) {
						banners+= '<li><a href="./detail.html?id='+item.id+'">'
							+'<img src=' + imgUrl(item.image) + ' alt="" />'
							+'<div class="caption center-align">'
							+'<h5 class="light grey-text text-lighten-3 banner-text">' + item.title + '</h5>'
							+'</div></a>'
							+'</li>';
					});
					$('.slides').html(banners);
					$('.slider').slider({
						height: '14rem'
					});
					data.stories.forEach(function (item) {
						li+= '<li class="p-5 waves-effect c-radius z-depth-1">'
							+'	<a href="./detail.html?id=' + item.id + '">'
							+'		<p class="m-r-1">' + item.title + '</p>'
							+'		<img src=' + imgUrl(item.images[0]) + ' alt="" />'
							+'	</a>'
							+'</li>';
					});
					$('#list').append(li);
					s();

					setTimeout(function(){
						isCalling = false;
					},300);
					
				},
				error: function (data) {
					console.log(data)
				}
			});


			$.ajax({
				url: 'http://111.230.139.105/api/zhihu/themes',
				success: function (data) {
					var li = '';
					data.others.forEach(function (item) {
						li+= '<li><a onClick="handleTab(' + item.id + ')" class="waves-effect">' + item.name + '</a></li>'
					})
					$('#slide-out').append(li);
				},
				error: function (data) {
				}
			});

		})

    }

    handleClick() {
        window.location.reload();
    }

    render() {

        return (
            <div id="content">
			<div className="navbar-fixed">
				<nav className="light-blue">
					<div className="nav-wrapper">
						<a href="#!" className="left-align">首页</a>
						<ul className="right">
							<li><a href="#modal1" className="waves-effect waves-light"><i className="material-icons">notifications</i></a></li>
							<li><a href="#" className="waves-effect waves-light"><i className="material-icons" onClick={this.handleClick}>refresh</i></a></li>
							<li><a className="dropdown-button waves-effect waves-light" href="#!" data-activates="dropdown1"><i className="material-icons">more_vert</i></a></li>
						</ul>

						<a href="#" data-activates="slide-out" className="waves-effect waves-light button-collapse"><i className="material-icons">menu</i></a>
					</div>
				</nav>
			</div>
			<div id="modal1" className="modal">
				<div className="modal-content">
				<h4>请登录</h4>
				</div>
				<div className="modal-footer">
				<a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">登录</a>
				</div>
			</div>
			<ul id="dropdown1" className="dropdown-content z-depth-5">
				<li><a href="#">夜间模式</a></li>
				<li><a href="#">设置选项</a></li>
			</ul>
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
				<li><a className="waves-effect" onClick={this.handleClick}>
					<span className="color-blue"><i className="material-icons slide-left-icon slide-left-icon-home">home</i>首页</span>
					</a>
				</li>
			</ul>
			<div id="scrollArea">
				<div className="slider">
					<ul className="slides" id="banner">

					</ul>
					
				</div>
				<div id="container">
					<ul id="list">
						
					</ul>
					<div className="preloader-wrapper small active" id="loading">
						<div className="spinner-layer spinner-green-only">
						<div className="circle-clipper left">
							<div className="circle"></div>
						</div><div className="gap-patch">
							<div className="circle"></div>
						</div><div className="circle-clipper right">
							<div className="circle"></div>
						</div>
						</div>
					</div>
				</div>
			</div>

			
		</div>
      );
    }
}

export default App
