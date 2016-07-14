var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var path = require('path');

module.exports = {
	entry: [
		'webpack-dev-server/client?http://localhost:6000', // WebpackDevServer host and port
		'webpack/hot/only-dev-server',
		'./src/app.jsx',
	],
	output: {
		path: path.join(__dirname,"dist"),
		filename: 'bundle.js',
		publicPath: "/static/"
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: ['jsx-loader', 'babel'],
				exclude: /node_modules/,
				include: __dirname
			},
			{
				test: /\.scss$/,
				loader: "style!css!sass"
			},
			{
				test: /\.css$/,
				loader: "style!css"
			},
			{
				test: /\.(jpg|png)$/,
				loader: "url?limit=40000"
			},
			{
				test: /\.(woff|svg|ttf|eot)/,
				loader: "file"
			}
		]
	},
	plugins: [
		new CommonsChunkPlugin('common.js'),
		new OpenBrowserPlugin({ url: 'http://localhost:6000' }),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,
		port: 6000,
	},

}