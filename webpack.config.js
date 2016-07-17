var webpack = require('webpack');
// var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
// var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var path = require('path');

module.exports = {
	entry: [
		// 'webpack-hot-middleware/client?http://localhost:8000/', // WebpackDevServer host and port
		// 'webpack/hot/only-dev-server',
    	'webpack-hot-middleware/client?reload=true&http://localhost:8000',
		'webpack/hot/only-dev-server',
		'./src/app.jsx',
	],
	output: {
		path: path.join(__dirname,"server/app/static"),
		filename: 'bundle.js',
		publicPath: "/static/"
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: ['react-hot-loader', 'babel'],
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
				test: /\.(jpg|png|jpeg|gif)$/,
				loader: "url?limit=8192"
			},
			{
				test: /\.(woff|svg|ttf|eot)/,
				loader: "file"
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
		]
	},
	plugins: [
		// new CommonsChunkPlugin('common.js'),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		// new OpenBrowserPlugin({ url: 'http://localhost:8000' }),
	],
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,
		port: 8000,
	},

}