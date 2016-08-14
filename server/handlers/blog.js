var mongoose = require('mongoose');
var _ = require('lodash');

/* 数据表 */
var Blog = require('../models/Blog.js');
var Comment = require('../models/Comment.js');
var Tourist = require('../models/Tourist.js');

/* 邮件 */
var mail = require('../sendEmail.js');

/* 日期格式化 */
var dateFormat = require('../utils/dateFormat.js');


/*
	请求博文数目
*/
exports.blogCount = function(req, res) {

	Blog.getCount(function(err, count) {

		if ( err ) {
			return errorHandler(err, res);
		}

		return res.json({
			result: 'success',
			count: count,
		});

	});

};

/*
	请求首页博文列表
*/
exports.homeBlog = function(req, res) {

	console.log('请求首页博文列表…');

	var page = req.body.page;

	Blog.fetchByPage(page, function(err, blogs) {

		if ( err ) {
			return errorHandler(err, res);
		}

		return res.json({
			result: 'success',
			blogs: blogs, 
		})
	});

};

/*
	请求首页页码
*/
exports.homePage = function(req, res) {

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

};

/*
	请求博文详情
*/
exports.blogDetail = function(req, res) {

	console.log('请求博文详情…');

	var blogId = req.body.blogId;

	Blog.findByBlogId(blogId, function(err, blog) {

		if ( err ) {
			return errorHandler(err, res);
		} 

		if( !blog ) {
			blog = getSafeBlog();
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

};

/*
	请求相邻博文
*/
exports.nearBlog = function(req, res) {

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
					return false;
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

};

/*
	请求博文评论列表
*/
exports.blogComment = function(req, res) {

	console.log('请求博文评论');

	var blogId = req.body.blogId;

	Comment.fetchBlogComment(blogId, function(err, comments) {

		if ( err ) {
			return errorHandler(err, res);
		}

		return res.json({
			result: 'success',
			comments: comments || [], 
		})
	});

};

/*
	请求留言板留言
*/
exports.boardComment = function(req, res) {

	Comment.fetchBoardComment(function(err, comments) {

		if ( err ) {
			return errorHandler(err, res);
		}
 
		return res.json({
			result: 'success',
			comments: comments || [], 
		})
	});
 
};




/*
	发布博客评论
*/
exports.addBlogComment = function(req, res) {

	var formData = {
		blogId: req.body.blogId || -1,
		nickname: req.body.nickname || '',
		email: req.body.email || '',
		website: req.body.website || '',
		content: req.body.content || '',
	};

	var quoteData = req.body.quoteData;

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
	} else if ( !/\S/.test(formData.content.replace(/<blockquote>[\s\S]*<\/blockquote>/g, '')) ) {
		return res.json({
			result: 'error',
			reason: '评论内容不能为空',
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
				console.log('更新游客信息');
			});
		}

	});



	/*
		存储评论
	*/

	// 查询有无对应博文
	Blog.findByBlogId(formData.blogId, function(err, blog) {

		if( err ) {
			return errorHandler(err, res);
		}

		// 无此博文，则不能存储评论
		if ( _.isEmpty(blog) ) {
			return res.json({
				result: 'error',
				reason: '评论失败，数据库无此博文',
			})
		};

		/*
			存储评论
		*/
		let comment_time = Date.now();
		new Comment({
			host: formData.blogId,
			type: 'blog',
			user: {
				nickname: formData.nickname,
				email: formData.email,
				website: formData.website,
			},
			time: comment_time,
			content: formData.content,
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
							comment: quoteData.content.replace(/<blockquote>[\s\S]*<\/blockquote>/, ''),
							time: dateFormat(quoteData.time, 'YYYY-MM-DD hh:mm:ss'),
						},
						replyFrom: { // 回复人
							nickname: formData.nickname,
							comment: formData.content,
							time: dateFormat(comment_time, 'YYYY-MM-DD hh:mm:ss'),
						},
						blog: {
							blogId: blog.blogId,
							title: blog.title,
						}

					}
				}
				// 如果有引用人，则发送评论通知
				if( /<blockquote>[\s\S]*<pre>/.test(formData.content) && quoteData.email ) {
					opts.data.replyFrom.comment = opts.data.replyFrom.comment.replace(/<blockquote>[\s\S]*<\/blockquote>/, '');
					mail.commentNotice(opts);
				}

				mail.commentNotice_myself(opts);

				return res.json({
					status: 'success'
				});

			});
		});
	});

};

/*
	发布留言板留言
*/
exports.addBoardComment = function(req, res) {

	var formData = {
		nickname: req.body.nickname || '',
		email: req.body.email || '',
		website: req.body.website || '',
		content: req.body.content || '',
	};

	var quoteData = req.body.quoteData;

	// 表单验证
	if ( !/\S/.test(formData.nickname) ) {
		return res.json({
			result: 'error',
			reason: '昵称不能为空',
		});
	} else if ( !/\S/.test(formData.email) ) {
		return res.json({
			result: 'error',
			reason: '邮箱不能为空',
		});
	} else if ( !/\S/.test(formData.content.replace(/<blockquote>[\s\S]*<\/blockquote>/g, '')) ) {
		return res.json({
			result: 'error',
			reason: '评论内容不能为空',
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
				console.log('更新游客信息');
			});
		}

	});


	/*
		存储评论
	*/
	let comment_time = Date.now();
	new Comment({
		host: -1,
		type: 'board',
		user: {
			nickname: formData.nickname,
			email: formData.email,
			website: formData.website,
		},
		time: comment_time,
		content: formData.content,
	}).save(function(err) {

		if (err) {
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
					comment: quoteData.content.replace(/<blockquote>[\s\S]*<\/blockquote>/, ''),
					time: dateFormat(quoteData.time, 'YYYY-MM-DD hh:mm:ss'),
				},
				replyFrom: { // 回复人
					nickname: formData.nickname,
					comment: formData.content,
					time: dateFormat(comment_time, 'YYYY-MM-DD hh:mm:ss'),
				},
				blog: {
					blogId: -1,
					title: '',
				}

			}
		}
		// 如果有引用人，则发送评论通知
		if( /<blockquote>[\s\S]*<pre>/.test(formData.content) && quoteData.email ) {
			opts.data.replyFrom.comment = opts.data.replyFrom.comment.replace(/<blockquote>[\s\S]*<\/blockquote>/, '');
			mail.boardNotice(opts);
		}

		mail.boardNotice_myself(opts);

		return res.json({
			status: 'success'
		});

	});

};



/*
	博文点赞
*/
exports.addBlogLike = function(req, res) {

	var blogId = req.body.blogId;

	Blog.findByBlogId(blogId, function(err, blog) {

		if ( err ) {
			return errorHandler(err, res);
		} 

		// 无此博文
		if ( _.isEmpty(blog) ) {
			return res.json({
				status: 'error',
				reason: '数据库无此博文，点赞失败',
			});
		}

		blog.numbers.like++;

		// 保存数据
		blog.save(function(err) {

			if ( err ) {
				return errorHandler(err, res);
			}

			console.log('博文点赞增加');

			return res.json({
				status: 'success',
			});

		});

	});

};


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
