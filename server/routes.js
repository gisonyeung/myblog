var mongoose = require('mongoose');
var _ = require('lodash');
mongoose.connect('mongodb://localhost:27017/blog');

/* 数据表 */
var Blog = require('./models/Blog.js');
var Comment = require('./models/Comment.js');
var Tourist = require('./models/Tourist.js');

module.exports = function(app) {

	app.get('*', function(req, res) {
		res.render('../server/app/index.html');
	});


	/* 
		请求首页博文列表 
	*/
	app.post('/homeBlog', function(req, res) {

		console.log('请求首页博文列表…');

		var page = req.body.page;


		// Blog.find(function(err, blogs) {

		// 	if(blogs.length) {
		// 		console.log(blogs.length);
		// 	} else {
		// 		new Blog({
		// 			blogId: 1,
		// 			title: '1',
		// 			summary: '摘要哈哈哈哈哈哈哈哈',
		// 			content: '内容才vbcv',
		// 			category: '分类',
		// 			tags: '标签',
		// 			numbers: {
		// 				view: 123,
		// 				comment: 321,
		// 				like: 32,
		// 			},
		// 			time: {
		// 				createAt: Date.now(),
		// 				updateAt: Date.now(),
		// 			},
		// 			isShow: true,
		// 		}).save();
		// 		new Blog({
		// 			blogId: 2,
		// 			title: '12',
		// 			summary: '摘要哈哈哈哈哈哈哈哈',
		// 			content: '内容下次vxc',
		// 			category: '分类',
		// 			tags: '标签',
		// 			numbers: {
		// 				view: 123,
		// 				comment: 321,
		// 				like: 32,
		// 			},
		// 			time: {
		// 				createAt: Date.now(),
		// 				updateAt: Date.now(),
		// 			},
		// 			isShow: true,
		// 		}).save();
		// 		new Blog({
		// 			blogId: 3,
		// 			title: '123',
		// 			summary: '摘要哈哈哈哈哈哈哈哈',
		// 			content: '内容斯蒂芬',
		// 			category: '分类',
		// 			tags: '标签',
		// 			numbers: {
		// 				view: 123,
		// 				comment: 321,
		// 				like: 32,
		// 			},
		// 			time: {
		// 				createAt: Date.now(),
		// 				updateAt: Date.now(),
		// 			},
		// 			isShow: true,
		// 		}).save();
		// 		new Blog({
		// 			blogId: 4,
		// 			title: '1234',
		// 			summary: '摘要哈哈哈哈哈哈哈哈',
		// 			content: '内容富国汇股份',
		// 			category: '分类',
		// 			tags: '标签',
		// 			numbers: {
		// 				view: 123,
		// 				comment: 321,
		// 				like: 32,
		// 			},
		// 			time: {
		// 				createAt: Date.now(),
		// 				updateAt: Date.now(),
		// 			},
		// 			isShow: true,
		// 		}).save();
		// 		new Blog({
		// 			blogId: 5,
		// 			title: '12345',
		// 			summary: '摘要哈哈哈哈哈哈哈哈',
		// 			content: '内容太阳日',
		// 			category: '分类',
		// 			tags: '标签',
		// 			numbers: {
		// 				view: 123,
		// 				comment: 321,
		// 				like: 32,
		// 			},
		// 			time: {
		// 				createAt: Date.now(),
		// 				updateAt: Date.now(),
		// 			},
		// 			isShow: true,
		// 		}).save();
		// 		new Blog({
		// 			blogId: 6,
		// 			title: '123456',
		// 			summary: '摘要哈哈哈哈哈哈哈哈',
		// 			content: '内容太阳日富国汇股份',
		// 			category: '分类',
		// 			tags: '标签',
		// 			numbers: {
		// 				view: 123,
		// 				comment: 321,
		// 				like: 32,
		// 			},
		// 			time: {
		// 				createAt: Date.now(),
		// 				updateAt: Date.now(),
		// 			},
		// 			isShow: true,
		// 		}).save();


		// 	}
		// });

		Blog.fetchByPage(page, function(err, blogs) {

			if ( err ) {
				return errorHandler(err, res);
			}

			return res.json({
				result: 'success',
				blogs: blogs, 
			})
		});

	});

	/* 
		请求首页页码
	*/
	app.post('/homePage', function(req, res) {

		console.log('请求首页页码…');

		Blog.getCount(function(err, number) {

			if ( err ) {
				return errorHandler(err, res);
			} 

			return res.json({
				result: 'success',
				page: Math.ceil(number / 5) || 1, // 向上取整，最小为一页
			})

		});

	});

	/*
		请求博文详情
	*/
	app.post('/blogDetail', function(req, res) {

		console.log('请求博文详情…');

		var blogId = req.body.blogId;

		Blog.findByBlogId(blogId, function(err, blog) {

			if ( err ) {
				return errorHandler(err, res);
			} 

			if( !blog ) {
				blog = getSafeBlog();
			}

			return res.json({
				result: 'success',
				blog: blog,
			})

		});

	});


	/*
		请求相邻博文
	*/
	app.post('/nearBlog', function(req, res) {

		console.log('请求相邻博文…');

		var blogId = req.body.blogId;

		var prevId = blogId - 1,
			nextId = blogId + 1;

		
		
		var prevPromise = new Promise(function(resolve, reject) {
			
			var prev = {
				blogId: -1,
				title: '',
			};

			if( prevId > 0 ) {
				Blog.getTitle(prevId, function(err, blog) {
					if ( err ) {
						reject(err);
					}

					if( blog ) {
						prev = blog;
					}

					resolve(prev);

				});
			} else {
				resolve(prev);
			}

		});

		var nextPromise = new Promise(function(resolve, reject) {
			
			var next = {
				blogId: -1,
				title: '',
			}

			if( nextId > 0 ) {
				Blog.getTitle(nextId, function(err, blog) {
					if ( err ) {
						reject(err);
					}

					if( blog ) {
						next = blog;
					}

					resolve(next);

				});
			} else {
				resolve(next);
			}

		});

		/*
			数据库查询为异步操作，将查询封装成promise，
			两个都完成的时候则返回json
		*/
		Promise
			.all([prevPromise, nextPromise])
			.then(nearBlogs => res.json({
					result: 'success',
					nearBlog: {
						prev: nearBlogs[0],
						next: nearBlogs[1]
					},
				})
			)
			.catch(err => errorHandler(err, res));

	});


	/*
		请求博文评论列表
	*/
	app.post('/blogComment', function(req, res) {

		console.log('请求博文评论');

		var blogId = req.body.blogId;

		Comment.find(function(err, comments) {

			if ( comments.length ) {

			} else {

				new Comment({
					host: 6,
					type: 'blog',
					user: {
						nickname: '土川',
						email: '56343@qq.com',
						website: 'http://www.baidu.com',
					},
					time: Date.now(),
					content: '这是儿童我发给热天'
				}).save();
				new Comment({
					host: 6,
					type: 'blog',
					user: {
						nickname: '土川2',
						email: '56343@qq.com',
						website: '',
					},
					time: Date.now(),
					content: '这是儿童我发给热2天'
				}).save();
				new Comment({
					host: 6,
					type: 'blog',
					user: {
						nickname: '土川3',
						email: '56343@qq.com',
						website: '',
					},
					time: Date.now(),
					content: '这是儿童我发456给热天'
				}).save();
				new Comment({
					host: 6,
					type: 'blog',
					user: {
						nickname: '土川',
						email: '56343@qq.com',
						website: 'http://www.baidu.com',
					},
					time: Date.now(),
					content: '这是儿童我发456给热天'
				}).save();
				new Comment({
					host: 6,
					type: 'blog',
					user: {
						nickname: '土川',
						email: '56343@qq.com',
						website: 'http://www.baidu.com',
					},
					time: Date.now(),
					content: '这是儿童我456发给热天'
				}).save();
				new Comment({
					host: 6,
					type: 'blog',
					user: {
						nickname: '土川',
						email: '56343@qq.com',
						website: 'http://www.baidu.com',
					},
					time: Date.now(),
					content: '这是儿童我456发给热天'
				}).save();
				new Comment({
					host: 5,
					type: 'blog',
					user: {
						nickname: '土川2',
						email: '56343@qq.com',
						website: 'http://www.baidu.com',
					},
					time: Date.now(),
					content: '这是儿童我456发给热天'
				}).save();
				new Comment({
					host: 5,
					type: 'blog',
					user: {
						nickname: '土川3',
						email: '56343@qq.com',
						website: 'http://www.baidu.com',
					},
					time: Date.now(),
					content: '这是儿童我456发给热天'
				}).save();
			}
		});

		Comment.fetchBlogComment(blogId, function(err, comments) {

			if ( err ) {
				return errorHandler(err, res);
			}

			return res.json({
				result: 'success',
				comments: comments, 
			})
		});


	});


	/*
		发布博客评论
	*/
	app.post('/addBlogComment', function(req, res) {

		var formData = {
			blogId: req.body.blogId || -1,
			nickname: req.body.nickname || '',
			email: req.body.email || '',
			website: req.body.website || '',
			content: req.body.content || '',
		};

		// 表单验证
		if ( formData.blodId <= 0 ) {
			return res.json({
				result: 'error',
				reason: '未知所属博文',
			});
		} else if ( !/\S/.test(formData.nickname) ) {
			return res.json({
				result: 'error',
				reason: '昵称不能为空',
			});
		} else if ( !/\S/.test(formData.email) ) {
			return res.json({
				result: 'error',
				reason: '邮箱不能为空',
			});
		} else if ( !/\S/.test(formData.content) ) {
			return res.json({
				result: 'error',
				reason: '评论内容不能为空',
			});
		} else if ( !/^\w+@\w+\.\w+(\.\w+)?$/.test(formData.email) ) {
			return res.json({
				result: 'error',
				reason: '电子邮箱格式错误',
			});
		};

		/*
      个人网站不为空时，检测有无https?://前缀，无则添加http://
	    */
	    if ( /\S/.test(formData.website) ) {
			formData.website = formData.website.replace(/^(https?:\/\/)?.*/, function(match, capture) {
				// 有捕获组，已有前缀
				if ( capture ) {
					return match;
				} else {
					return 'http://' + match;
				}
			});
	    }

		/*
			查询是否有此有游客，有则更新信息，无则执行save
		*/
		Tourist.fetchTourist(formData.email, function(err, person) {

			if ( err ) {
				return errorHandler(err, res);
			}

			// 数据库无此游客，存入数据库
			if( _.isEmpty(person) ) {
				new Tourist({
					nickname: formData.nickname,
					email: formData.email,
					website: formData.website,
				}).save();
			} else {
				// 已有此游客，更新除email外的信息
				Tourist.update(
				{
					email: formData.email
				}, 
				{
					$set: { 'nickname': formData.nickname },
					$set: { 'website': formData.website },
				},
				function(err, person) {
					console.log('更新游客信息:', person);
				});
			}

		});

		/*
			存储评论
		*/
		new Comment({
			host: formData.blogId,
			type: 'blog',
			user: {
				nickname: formData.nickname,
				email: formData.email,
				website: formData.website,
			},
			time: Date.now(),
			content: formData.content,
		}).save(function(err, comment) {

			if (err) {
				return errorHandler(err, res);
			}

			return res.json({
				status: 'success'
			});
		});












	});



	


}


function errorHandler(err, res) {
	console.log(err);
	return res.json({
		result: 'error',
		reason: '数据库错误', 
	})
}

function getSafeBlog() {
	return {
		blogId: -1,
		time: {},
		numbers: {},
	}
}
