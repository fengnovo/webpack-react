const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: __dirname+'/src/index.js',
    output: {
        path: __dirname+'/build',
        fileName: 'bundle.js'
    },
	resolve: [
		'','.js','.jsx'
	],
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: ['babel'],
			exclude: /node_modules/,
			// include: __dirname
		}]
	},
	// plugins: [
	// 	new webpack.HotModuleReplacementPlugin(),
	// 	new webpack.NoErrorsPlugin()
	// ],
    devServer: {
        contentBase: './',
        colors: true,
        inline: true,
        historyApiFallback: true
    }
};
