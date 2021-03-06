var path = require('path');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.dev.config');

var app = new (require('express'))();
var port = 3005;

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler,{
	noInfo: true,
	publicPath: config.output.publicPath,
	stats: {
		colors: true
	}
}));
app.use(webpackHotMiddleware(compiler));
app.get('*',function(req,res){
	res.sendFile(path.join(__dirname,'index.html'));
});
app.listen(port,function(e){
	if(e){
		console.error(e);
	}else{
		console.info('==> 🌐 正在监听  %s.  在浏览器打开 http://localhost:%s/ ',port,port);
	}
})