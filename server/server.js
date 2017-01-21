var webpack = require('webpack');
var express = require('express');
var app = express();
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('../webpack.config');
var bodyParser = require('body-parser');
var port = 8000;
var compiler = webpack(config);
var log4js = require('./loggerConfig');
var _ = require('lodash');

app.use(express.static(__dirname + '/app'));
app.use(webpackDevMiddleware(compiler, { 
	noInfo: true, 
	publicPath: config.output.publicPath,
	hot: true,
	stats: { colors: true } ,
}));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.json({limit: '50mb'})); 
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); 

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
var credentials = require('./credentials.js');

var mongoose = require('mongoose');
mongoose.connect(credentials.mongo.development);

/* session */
var SessionStore = require('session-mongoose')(require('connect'));
var store = new SessionStore({
	url: credentials.mongo.session,
	interval: 9000000,
});

var getClientIp = require('./utils/getClientIp.js');
// 路由拦截，设置域名白名单防止SEO盗取流量
var WHITE_DOMAIN_LIST = require('./constants/white_domain');
var seoLogger = log4js.getLogger('SEO');
app.use(function(req, res, next) {
	var hostname = req.hostname || '无域名';
	if ( !_.includes(WHITE_DOMAIN_LIST, hostname.toLowerCase()) ) {
		if ( !/favicon\.ico/.test(req.url) ) {
			seoLogger.warn('非法域名意图访问: ' + hostname);
		}
		res.render('../server/app/forbidden.html');
	} else {
		if ( /seeyou/.test(req.url) ) {
			seoLogger.info('访问 seeyou 页: ' + getClientIp(req));
		}
		next();
	}
});

app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')({
	store: store,
	cookie: { maxAge: 9000000 },
}));

app.use(function(req, res, next) {
	// 如果session有user，把它传到上下文中
	res.locals.user = req.session.user;
	next();
});

// app.use(express.limit(100000000));


// 路由
require('./routes.js')(app);




/* 需要开启多线程，则取消注释下面的代码 */

// var cluster = require("cluster");
// var numCPUs = require("os").cpus().length;

// if (cluster.isMaster) {
//   for (var i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }
//   // 线程关闭时，重新fork一个
//   cluster.on("exit", function(worker, code, signal) {
//     cluster.fork();
//   });
// } else {

	app.listen(port, function(err){

		if( err ){
			console.log(err);
		}

		console.log('The server is running on http://localhost:8000/');
	});

// }






