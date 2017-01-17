var path = require('path');

var credentials = require('./credentials.js');
var _ = require('lodash');

/* 路由处理 */
var blog = require('./handlers/blog.js');
var walkingblog = require('./handlers/walkingblog.js');
var book = require('./handlers/book.js');
var archives = require('./handlers/archives.js');
var category = require('./handlers/category.js');
var tag = require('./handlers/tag.js');
var site = require('./handlers/site.js');
var backstage = require('./handlers/backstage.js');


module.exports = function(app) {

	/*
		后台管理系统
	*/
	app.get('/admin/login', function(req, res) {

		res.render('../server/app/backstage/html/login.html');

	});

	app.get('/admin/comment', function(req, res) {

		// 验证通过 则跳转页面
		if ( checkSession(req) ) {
			
			res.render('../server/app/backstage/html/comment.html');
		
		} else {

			res.redirect('/admin/login');

		}

	});

	app.get('/admin/tourist', function(req, res) {

		// 验证通过 则跳转页面
		if ( checkSession(req) ) {
			
			res.render('../server/app/backstage/html/tourist.html');
		
		} else {

			res.redirect('/admin/login');

		}

	});

	app.get('/admin/member', function(req, res) {

		// 验证通过 则跳转页面
		if ( checkSession(req) ) {
			
			res.render('../server/app/backstage/html/member.html');
		
		} else {

			res.redirect('/admin/login');

		}

	});

	app.get('/admin/walkingblog', function(req, res) {

		// 验证通过 则跳转页面
		if ( checkSession(req) ) {
			
			res.render('../server/app/backstage/html/walkingblog.html');
		
		} else {

			res.redirect('/admin/login');

		}

	});

	app.get('/admin/book', function(req, res) {

		// 验证通过 则跳转页面
		if ( checkSession(req) ) {
			
			res.render('../server/app/backstage/html/book.html');
		
		} else {

			res.redirect('/admin/login');

		}

	});

	app.get('/admin/blog', function(req, res) {

		// 验证通过 则跳转页面
		if ( checkSession(req) ) {
			
			res.render('../server/app/backstage/html/blog.html');
		
		} else {

			res.redirect('/admin/login');

		}

	});

	app.get('/admin/category', function(req, res) {

		// 验证通过 则跳转页面
		if ( checkSession(req) ) {
			
			res.render('../server/app/backstage/html/category.html');
		
		} else {

			res.redirect('/admin/login');

		}

	});

	app.get('/admin/tag', function(req, res) {

		// 验证通过 则跳转页面
		if ( checkSession(req) ) {
			
			res.render('../server/app/backstage/html/tag.html');
		
		} else {

			res.redirect('/admin/login');

		}

	});














	function checkSession(req) {

		if ( !req.session.user ) {
			return false;
		} 

		return req.session.user.username === credentials.admin.username && req.session.user.password === credentials.admin.password;
	};




	/*
		history fallback
	*/
	app.get('*', function(req, res) {
		res.render('../server/app/entry.html');
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
		请求行博列表
	*/
	app.post('/walkingBlogMore', walkingblog.blogListMore);



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
		请求留言板留言
	*/
	app.post('/boardCommentMore', blog.boardCommentMore);



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

	/*
		发送退订验证邮件
	*/
	app.post('/unsubconfirm', site.unsubconfirm);

	/*
		退订
	*/
	app.post('/cancelSub', site.cancelSub);

	/*
		增加访问量
	*/
	app.post('/addSiteView', site.addSiteView);





	/*       后台管理          */


	/*
		登录
	*/
	app.post('/admin/login', backstage.login);

	/*
		根据页码获取评论
	*/
	app.post('/admin/commentByPage', backstage.commentByPage);

	/*
		获取评论页码总数
	*/
	app.post('/admin/commentPage', backstage.commentPage);

	/*
		删除评论
	*/
	app.post('/admin/deleteComment', backstage.deleteComment);


	/*
		根据页码获取游客
	*/
	app.post('/admin/touristByPage', backstage.touristByPage);

	/*
		获取游客页码总数
	*/
	app.post('/admin/touristPage', backstage.touristPage);

	/*
		删除游客
	*/
	app.post('/admin/deleteTourist', backstage.deleteTourist);

	/*
		获取指定游客的评论
	*/
	app.post('/admin/commentByTourist', backstage.commentByTourist);


	/*
		根据页码获取订阅用户
	*/
	app.post('/admin/memberByPage', backstage.memberByPage);

	/*
		获取订阅用户页码总数
	*/
	app.post('/admin/memberPage', backstage.memberPage);

	/*
		强制退订
	*/
	app.post('/admin/deleteMember', backstage.deleteMember);


	/*
		行博发布
	*/
	app.post('/admin/addWalkingblog', backstage.addWalkingblog);

	/*
		行博修改
	*/
	app.post('/admin/editWalkingblog', backstage.editWalkingblog);


	

	/*
		根据页码获取行博
	*/
	app.post('/admin/walkingblogByPage', backstage.walkingblogByPage);

	/*
		获取行博页码总数
	*/
	app.post('/admin/walkingblogPage', backstage.walkingblogPage);

	/*
		删除行博，及其对应评论
	*/
	app.post('/admin/deleteWalkingblog', backstage.deleteWalkingblog);

	/*
		更新行博评论数
	*/
	app.post('/admin/updateWalkingblogComment', backstage.updateWalkingblogComment);

	/*
		修改行博状态
	*/
	app.post('/admin/changeWalkingblogStatus', backstage.changeWalkingblogStatus);




	/*
		书本发布
	*/
	app.post('/admin/addBook', backstage.addBook);

	/*
		书本修改
	*/
	app.post('/admin/editBook', backstage.editBook);

	/*
		根据页码获取书单
	*/
	app.post('/admin/bookByPage', backstage.bookByPage);

	/*
		获取书单页码总数
	*/
	app.post('/admin/bookPage', backstage.bookPage);

	/*
		删除书本
	*/
	app.post('/admin/deleteBook', backstage.deleteBook);



	/*
		发布博文	
	*/
	app.post('/admin/addBlog', backstage.addBlog);

	/*
		博文上传图片，返回URL
	*/
	app.post('/admin/uploadPhoto', backstage.uploadPhoto);
	
	/*
		根据页码获取博文
	*/
	app.post('/admin/blogByPage', backstage.blogByPage);


	/*
		获取博文页码总数
	*/
	app.post('/admin/blogPage', backstage.blogPage);

	/*
		删除博文，及其对应评论，修改分类，标签
	*/
	app.post('/admin/deleteBlog', backstage.deleteBlog);

	/*
		更新博文评论数
	*/
	app.post('/admin/updateBlogComment', backstage.updateBlogComment);

	/*
		修改博文状态
	*/
	app.post('/admin/changeBlogStatus', backstage.changeBlogStatus);
	
	/*
		修改博文前，获取博文详情
	*/
	app.post('/admin/blogDetail', backstage.blogDetail);
	/*
		修改博文
	*/
	app.post('/admin/editBlog', backstage.editBlog);
	



	/*
		请求分类列表
	*/
	app.post('/admin/loadCategories', backstage.loadCategories);

	/*
		通过分类查看博文
	*/
	app.post('/admin/blogByCategory', backstage.blogByCategory);

	/*
		更新分类博文数
	*/
	app.post('/admin/updateCateBlog', backstage.updateCateBlog);

	/*
		新增分类
	*/
	app.post('/admin/addCategory', backstage.addCategory);

	/*
		修改分类名
	*/
	app.post('/admin/editCategory', backstage.editCategory);

	/*
		删除分类
	*/
	app.post('/admin/deleteCategory', backstage.deleteCategory);





	/*
		请求标签列表
	*/
	app.post('/admin/loadTags', backstage.loadTags);

	/*
		通过标签查看博文
	*/
	app.post('/admin/blogByTag', backstage.blogByTag);

	/*
		更新标签博文数
	*/
	app.post('/admin/updateTagBlog', backstage.updateTagBlog);

	/*
		新增标签
	*/
	app.post('/admin/addTag', backstage.addTag);

	/*
		修改标签名
	*/
	app.post('/admin/editTag', backstage.editTag);

	/*
		删除标签
	*/
	app.post('/admin/deleteTag', backstage.deleteTag);



}


