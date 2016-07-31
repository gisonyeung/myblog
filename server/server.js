var webpack = require('webpack');
var express = require('express');
var app = express();
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('../webpack.config');
var bodyParser = require('body-parser');
var port = 8000;
var compiler = webpack(config);

app.use(express.static(__dirname + '/app'));
app.use(webpackDevMiddleware(compiler, { 
	noInfo: true, 
	publicPath: config.output.publicPath,
	hot: true,
	stats: { colors: true } ,
}));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// 路由
require('./routes.js')(app);


app.listen(port, function(err){

	if( err ){
		console.log(err);
	}
	console.log('The server is running on http://localhost:8000/');
});
