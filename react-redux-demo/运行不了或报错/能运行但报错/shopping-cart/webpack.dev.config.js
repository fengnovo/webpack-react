const path = require('path');
const webpack = require('webpack');

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: [
		'react-hot-loader/patch',
		'webpack-hot-middleware/client?reload=true',
		path.resolve(__dirname,'src/index.js')
	],
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname,'dist'),
		publicPath: 'http://localhost:3005/'
	},
	resolve: {
		extendsions: ['','.js','.jsx']
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: ['babel'],
			exclude: /node_modules/,
			include: __dirname
		}]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]
};
