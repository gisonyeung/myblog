var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blog');

/* 路由处理 */
var blog = require('./handlers/blog.js');
var walkingblog = require('./handlers/walkingblog.js');
var book = require('./handlers/book.js');
var archives = require('./handlers/archives.js');
var category = require('./handlers/category.js');
var tag = require('./handlers/tag.js');
var site = require('./handlers/site.js');

module.exports = function(app) {


	/*
		history fallback
	*/
	app.get('*', function(req, res) {
		res.render('../server/app/index.html');
	});




	/* 
		请求博文数目 
	*/
	app.post('/blogCount', blog.blogCount);
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






	/*
		请求书单列表
	*/
	app.post('/bookList', book.bookList);

	/*
		书本点赞
	*/
	app.post('/bookLike', book.bookLike);






	/*
		按条件归档
	*/
	app.post('/archiveCondition', archives.archiveCondition);
	/*
		全部归档
	*/
	app.post('/archiveAll', archives.archiveAll);
	/*
		获取开博至今年的年份
	*/
	app.post('/siteYear', archives.siteYear);
	/*
		获取指定年份博文条数，按月份分组
	*/
	app.post('/blogCountForYear', archives.blogCountForYear);





	/*
		请求分类列表
	*/
	app.post('/categories', category.categories);

	/*
		请求标签列表
	*/
	app.post('/tags', tag.tags);

	






	/*
		请求留言板留言
	*/
	app.post('/boardComment', blog.boardComment);
	/*
		发布留言板留言
	*/
	app.post('/addBoardComment', blog.addBoardComment);







	/*
		订阅博客
	*/
	app.post('/subscribe', site.subscribe);
	/*
		请求站点数据
	*/
	app.post('/siteNum', site.siteNum);




}


