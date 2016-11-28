const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		index: './src/index',
		vendor: [
			'react','react-dom'
		]
	},
	output: {
		path: path.join(__dirname,'dist'),
		publicPath: '',
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.CommonsChunkPlugin('vendor','vendor.js'),
		new HtmlWebpackPlugin({
			title: '产品打包',
			filename: 'index.html',
			favicon: './src/favicon.ico',
			template: './src/template.html',
			inject: 'body',
			chunks: ['vendor','index'],
			hash: true,
			minify: {
				removeComments: true,
				collapseWhitespace: false
			}
		})
	],
	resolve: {
		extensions: ['','.js','jsx']
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loaders: ['babel'],
				exclude: /node_modules/,
				include: __dirname
			}
		]
	}
}