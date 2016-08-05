var mongoose = require('mongoose');
var _ = require('lodash');
var safeHTML = require('../utils/safeHTML.js');

/* 数据表 */
var WalkingBlog = require('../models/WalkingBlog.js');
var Comment = require('../models/Comment.js');
var Tourist = require('../models/Tourist.js');

/* 邮件 */
var mail = require('../sendEmail.js');

/* 日期格式化 */
var dateFormat = require('../utils/dateFormat.js');


/*
	请求行博列表
*/
exports.blogList = function(req, res) {

	// 测试数据
	WalkingBlog.find(function(err, blogs) {
		if ( !blogs.length ) {

			new WalkingBlog({
				blogId: 1,
				content: '朋友我当你一秒朋友，朋友我当你一世朋友',
				photo: '/walkingblog/1.jpg',
				tags: '手工,橡皮擦,字章,橡皮活字印刷术',
				numbers: {
					view: 0,
					comment: 0,
				},
				time: {
					createAt: Date.now(),
					updateAt: Date.now(),
				},
				isShow: true,
			}).save();

			new WalkingBlog({
				blogId: 2,
				content: '朋友我当你一秒朋友2，朋友我当你一世朋友',
				photo: '',
				tags: '手工,橡皮擦,字章',
				numbers: {
					view: 0,
					comment: 0,
				},
				time: {
					createAt: Date.now(),
					updateAt: Date.now(),
				},
				isShow: true,
			}).save();

			new WalkingBlog({
				blogId: 3,
				content: '朋友我当你一秒朋友3，朋友我当你一世朋友',
				photo: '/walkingblog/1.jpg',
				tags: '手工',
				numbers: {
					view: 0,
					comment: 0,
				},
				time: {
					createAt: Date.now(),
					updateAt: Date.now(),
				},
				isShow: true,
			}).save();

			
			new WalkingBlog({
				blogId: 4,
				content: '朋友我当你一秒朋友4，朋友我当你一世朋友',
				photo: '',
				tags: '',
				numbers: {
					view: 0,
					comment: 0,
				},
				time: {
					createAt: Date.now(),
					updateAt: Date.now(),
				},
				isShow: true,
			}).save();

			new WalkingBlog({
				blogId: 5,
				content: '朋友我当你一秒朋友5，朋友我当你一世朋友',
				photo: '/walkingblog/1.jpg',
				tags: '手工,橡皮擦,字章',
				numbers: {
					view: 0,
					comment: 0,
				},
				time: {
					createAt: Date.now(),
					updateAt: Date.now(),
				},
				isShow: true,
			}).save();

			new WalkingBlog({
				blogId: 6,
				content: '朋友我当你一秒朋友6，朋友我当你一世朋友',
				photo: '/walkingblog/1.jpg',
				tags: '手工,橡皮擦,字章',
				numbers: {
					view: 0,
					comment: 0,
				},
				time: {
					createAt: Date.now(),
					updateAt: Date.now(),
				},
				isShow: true,
			}).save();

		}
	});

	var beginIndex = req.body.beginIndex;

	WalkingBlog.fetchByIndex(beginIndex, function(err, blogs) {

		console.log('请求行博列表');

		if ( err ) {
			return errorHandler(err, res);
		}

		return res.json({
			result: 'success',
			blogs: blogs,
		});

	});

};

/*
	请求行博详情
*/
exports.blogDetail = function(req ,res) {

	console.log('请求行博详情…');

	var blogId = req.body.blogId;

	WalkingBlog.findByBlogId(blogId, function(err, blog) {

		if ( err ) {
			return errorHandler(err, res);
		} 

		if( !blog ) {
			blog = getSafeBlog();
			return res.json({
				result: 'error',
				reason: '查找不到此行博',
			})
		}

		blog.numbers.view++;
		blog.save(function(err) {

			if ( err ) {
				return errorHandler(err, res);
			} 

			return res.json({
				result: 'success',
				blog: blog,
			})

		});

		

	});
}

/*
	请求行博评论列表
*/
exports.blogComment = function(req, res) {

	console.log('请求行博评论');

	var blogId = req.body.blogId;

	Comment.fetchWalkingBlogComment(blogId, function(err, comments) {

		if ( err ) {
			return errorHandler(err, res);
		}

		return res.json({
			result: 'success',
			comments: comments, 
		})
	});

};

/*
	发布行博评论
*/
exports.addBlogComment = function(req, res) {

	var quoteData = {
		nickname: safeHTML(req.body.quoteData.nickname),
		email: safeHTML(req.body.quoteData.email),
		website: safeHTML(req.body.quoteData.website),
		content: safeHTML(req.body.quoteData.content),
		time: safeHTML(req.body.quoteData.time)
	};

	var formData = {
		blogId: req.body.blogId || -1,
		nickname: safeHTML(req.body.nickname) || '',
		email: safeHTML(req.body.email) || '',
		website: safeHTML(req.body.website) || '',
		content: safeHTML(req.body.content) || '',
	};


	if ( !/\S/.test(quoteData.email) ) {
		formData.replyTo = {
			nickname: '',
			email: '',
			website: '',
		};
	} else {
		formData.replyTo = {
			nickname: quoteData.nickname,
			email: quoteData.email,
			website: quoteData.website,
		};
	}

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
	} else if ( !/^\w+@\w+\.\w+(\.\w+)?$/.test(formData.email) ) {
		return res.json({
			result: 'error',
			reason: '电子邮箱格式错误',
		});
	} else if ( formData.content.length > 1500 ) {
		return res.json({
			result: 'error',
			reason: '评论内容过长',
		});
	} else if ( formData.nickname.length > 15 ) {
		return res.json({
			result: 'error',
			reason: '昵称过长',
		});
	} else if ( formData.email.length > 50 ) {
		return res.json({
			result: 'error',
			reason: '电子邮箱过长',
		});
	}  else if ( formData.website.length > 100 ) {
		return res.json({
			result: 'error',
			reason: '个人网站过长',
		});
	} 

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
		存储评论
	*/
	// 查询有无对应博文
	WalkingBlog.findByBlogId(formData.blogId, function(err, blog) {

		if( err ) {
			return errorHandler(err, res);
		}

		// 无此博文，则不能存储评论
		if ( _.isEmpty(blog) ) {
			return res.json({
				result: 'error',
				reason: '评论失败，数据库无此行博',
			})
		};

		/*
			存储评论
		*/
		let comment_time = Date.now();
		new Comment({
			host: formData.blogId,
			type: 'wb',
			user: {
				nickname: formData.nickname,
				email: formData.email,
				website: formData.website,
			},
			time: comment_time,
			content: formData.content,
			replyTo: formData.replyTo,
		}).save(function(err) {

			if (err) {
				return errorHandler(err, res);
			}

			// 评论数增加
			blog.numbers.comment++;
			blog.save(function(err) {
				if( err ) {
					return errorHandler(err, res);
				}

				// 发送邮件
				/*
					{
						to: 'xx@qq.com',
						data: {
							currentTime: '',
							replyTo: {
								nickname: '',
								comment: '',
								time: '',
							},
							replyFrom: {
								nickname: '',
								comment: '',
								time: '',
							},
							blog: {
								blogId: '',
								title: '',
							}
						},
					}
				*/
				var opts = {
					to: quoteData.email,
					data: {
						currentTime: dateFormat(Date.now(), 'YYYY-MM-DD hh:mm:ss'),
						replyTo: { // 邮件通知人，被回复人
							nickname: quoteData.nickname,
							comment: quoteData.content,
							time: dateFormat(quoteData.time, 'YYYY-MM-DD hh:mm:ss'),
						},
						replyFrom: { // 回复人
							nickname: formData.nickname,
							comment: formData.content,
							time: dateFormat(comment_time, 'YYYY-MM-DD hh:mm:ss'),
						},
						blog: {
							blogId: blog.blogId,
							content: blog.content,
						}

					}
				}
				// 如果有引用人，则发送评论通知
				if( quoteData.email ) {
					mail.replyNotice(opts);
				}

				mail.replyNotice_myself(opts);

				return res.json({
					status: 'success'
				});

			});
		});
	});

};

/*
	请求相邻行博
*/
exports.nearBlog = function(req, res) {

	console.log('请求相邻行博…');

	var blogId = req.body.blogId;

	var prevPromise = new Promise(function(resolve, reject) {
		
		var prev = -1;

		if( blogId - 1 > 0 ) {
			WalkingBlog.getPrevId(blogId, function(err, blog) {
				if ( err ) {
					reject(err);
				}

				if( !_.isEmpty(blog) ) {
					prev = blog[0].blogId;
				}

				resolve(prev);

			});
		} else {
			resolve(prev);
		}

	});

	var nextPromise = new Promise(function(resolve, reject) {
		
		var next = -1;

		if( blogId + 1 > 0 ) {
			WalkingBlog.getNextId(blogId, function(err, blog) {
				if ( err ) {
					reject(err);
				}

				if( !_.isEmpty(blog) ) {
					next = blog[0].blogId;
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

};






function errorHandler(err, res) {
	console.log(err);
	return res.json({
		result: 'error',
		reason: '数据库错误', 
	});
}

function getSafeBlog() {
	return {
		blogId: -1,
		time: {},
		numbers: {},
	};
}
