var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blog');

/* 路由处理 */
var blog = require('./handlers/blog.js');
var walkingblog = require('./handlers/walkingblog.js');

module.exports = function(app) {


	/*
		history fallback
	*/
	app.get('*', function(req, res) {
		res.render('../server/app/index.html');
	});







	/* 
		请求首页博文列表 
	*/
	app.post('/homeBlog', blog.homeBlog);

	/* 
		请求首页页码
	*/
	app.post('/homePage', blog.homePage);

	/*
		请求博文详情
	*/
	app.post('/blogDetail', blog.blogDetail);


	/*.
		请求相邻博文
	*/
	app.post('/nearBlog', blog.nearBlog);


	/*
		请求博文评论列表
	*/
	app.post('/blogComment', blog.blogComment);


	/*
		发布博客评论
	*/
	app.post('/addBlogComment', blog.addBlogComment);


	/*
		博文点赞
	*/
	app.post('/addBlogLike', blog.addBlogLike);










	/*
		请求行博列表
	*/
	app.post('/walkingBlog', walkingblog.blogList);

	/*
		请求行博详情
	*/
	app.post('/walkingBlogDetail', walkingblog.blogDetail);

	/*
		请求行博评论列表
	*/
	app.post('/walkingBlogComment', walkingblog.blogComment);


	/*
		发布行博评论
	*/
	app.post('/addWalkingBlogComment', walkingblog.addBlogComment);

	/*
		请求相邻行博
	*/
	app.post('/nearWalkingBlog', walkingblog.nearBlog);








}


