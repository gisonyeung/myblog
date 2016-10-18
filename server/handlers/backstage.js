var mongoose = require('mongoose');
var _ = require('lodash');
var formidable = require('formidable');
var fs = require('fs');


/* 数据表 */
var Blog = require('../models/Blog.js');
var Comment = require('../models/Comment.js');
var Tourist = require('../models/Tourist.js');
var Member = require('../models/Member.js');
var WalkingBlog = require('../models/WalkingBlog.js');
var Book = require('../models/Book.js');
var Category = require('../models/Category.js');
var Tag = require('../models/Tag.js');

/* 邮件 */
var mail = require('../sendEmail.js');

/* 日期格式化 */
var dateFormat = require('../utils/dateFormat.js');
var safeHTML = require('../utils/safeHTML.js');

var credentials = require('../credentials.js');

/*
	登录
*/
exports.login = function(req, res) {

	var username = req.body.username;
	var password = req.body.password;

	if ( username === credentials.admin.username && password === credentials.admin.password ) {
		
		// 存储session
		req.session.user = {
			username: username,
			password: password,
		};

		return res.json({
			result: 'success',
			url: '/admin/blog',
		});

	} else {

		// 删除session
		req.session.user = {};

		return res.json({
			result: 'error',
			reason: '你不是聪哥',
		});
	}

};

/*
	根据页码获取评论
*/
exports.commentByPage = function(req, res) {


	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}


	var page = req.body.page || 1;

	Comment.fetchByPage(page, function(err, comments) {

		if ( err ) {
			return errorHandler(err, res);
		}

		return res.json({
			result: 'success',
			comments: comments,
		});

	});

};

/*
	获取评论页码总数
*/
exports.commentPage = function(req, res) {


	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}


	Comment.getCount(function(err, number) {

		if ( err ) {
			return errorHandler(err, res);
		}

		return res.json({
			result: 'success',
			page: Math.ceil(number / 50) || 1, // 向上取整，最小为一页
		});

	});

};

/*
	删除评论
*/
exports.deleteComment = function(req, res) {


	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}

	Comment.delete(req.body.id, function(err, comment) {

		if ( err ) {
			return errorHandler(err, res);
		}

		if ( _.isEmpty(comment) ) {
			return res.json({
				result: 'error',
				reason: '删除失败，此评论不存在',
			});
		}

		// 找到对应博文，减少评论数

		if ( comment.host != -1 ) {

			WalkingBlog.findByBlogId(comment.host, function(err, blog) {

				if ( err ) {
					return errorHandler(err, res);
				}

				blog.numbers.comment--;

				blog.save(function(err) {

					if ( err ) {
						return res.json({
							result: 'error',
							reason: '删除成功，但对应博文的评论数修改失败'
						});
					}

					return res.json({
						result: 'success',
						commentId: comment._id,
						hostId: comment.host,
						type: comment.type,
					});

				});

			});

		} else {

			return res.json({
				result: 'success',
				commentId: comment._id,
				hostId: comment.host,
				type: comment.type
			});

		}



	});

};

/*
	根据页码获取游客
*/
exports.touristByPage = function(req, res) {


	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}


	var page = req.body.page || 1;

	Tourist.fetchByPage(page, function(err, tourists) {

		if ( err ) {
			return errorHandler(err, res);
		}

		return res.json({
			result: 'success',
			tourists: tourists,
		});

	});

};

/*
	获取游客页码总数
*/
exports.touristPage = function(req, res) {


	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}


	Tourist.getCount(function(err, number) {

		if ( err ) {
			return errorHandler(err, res);
		}

		return res.json({
			result: 'success',
			page: Math.ceil(number / 50) || 1, // 向上取整，最小为一页
		});

	});

};

/*
	删除游客
*/
exports.deleteTourist = function(req, res) {


	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}

	Tourist.delete(req.body.id, function(err, tourist) {

		if ( err ) {
			return errorHandler(err, res);
		}

		if ( _.isEmpty(tourist) ) {
			return res.json({
				result: 'error',
				reason: '删除失败，此游客不存在',
			});
		}

		return res.json({
			result: 'success',
			touristId: tourist._id,
		});

	});

};

/*
	获取指定游客的评论
*/
exports.commentByTourist = function(req, res) {


	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}


	Comment.fetchByTourist(req.body.email, function(err, comments) {

		if ( err ) {
			return errorHandler(err, res);
		}

		return res.json({
			result: 'success',
			comments: comments,
		});

	});

};

/*
	根据页码获取订阅用户
*/
exports.memberByPage = function(req, res) {


	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}


	var page = req.body.page || 1;

	Member.fetchByPage(page, function(err, members) {

		if ( err ) {
			return errorHandler(err, res);
		}

		return res.json({
			result: 'success',
			members: members,
		});

	});

};

/*
	获取订阅用户页码总数
*/
exports.memberPage = function(req, res) {


	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}


	Member.getCount(function(err, number) {

		if ( err ) {
			return errorHandler(err, res);
		}

		return res.json({
			result: 'success',
			page: Math.ceil(number / 50) || 1, // 向上取整，最小为一页
		});

	});

};

/*
	强制退订
*/
exports.deleteMember = function(req, res) {


	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}

	Member.delete(req.body.id, function(err, member) {

		if ( err ) {
			return errorHandler(err, res);
		}

		if ( _.isEmpty(member) ) {
			return res.json({
				result: 'error',
				reason: '退订失败，此成员不存在',
			});
		}

		return res.json({
			result: 'success',
			memberId: member._id,
		});

	});

};


// 确保存在目录
var dataDir = './server/app';
var walkingblogDir = dataDir + '/walkingblog';
fs.existsSync(dataDir) || fs.mkdirSync(dataDir);
fs.existsSync(walkingblogDir) || fs.mkdirSync(walkingblogDir);
fs.existsSync('./server/app/tmp') || fs.mkdirSync('./server/app/tmp');

/*
	发布行博
*/
exports.addWalkingblog = function(req, res) {

	if ( !checkSession(req) ) {

		return unlogin(res);

	}

	var form = new formidable.IncomingForm();
	form.uploadDir = "./server/app/tmp";  

	form.parse(req, function(err, fields, files) {

		if ( err ) {
			return res.send(JSON.stringify({
				result: 'error',
				reason: '发布失败，出现异常：' + err,
			}));
		}

		var formData = {
			content: fields.content || '',
			tags: safeHTML(fields.tags).replace(/,*^/, '') || '',
		};

		if ( !/\S/.test(formData.content) ) {
			return res.send(JSON.stringify({
				result: 'error',
				reason: '发布失败，行博内容不能为空',
			}));
		}

		var photo = files.photo;
		var hasPhoto = !!photo.name;
		var photoName = '',
			front_path = '';

		// 有图片则处理
		if ( hasPhoto ) {
			photoName = Date.now() + '.' + photo.type.split('/')[1];
			front_path = '/walkingblog/' + photoName;
		}
		
		// 找到最后一条行博的ID，+1
		WalkingBlog.findLastOne(function(err, lastBlog) {

			if ( err ) {
				return errorHandler(err, res);
			}

			var newBlogId = 1;

			if ( !_.isEmpty(lastBlog) ) {

				newBlogId = lastBlog[0].blogId + 1;

			}


			/*
				存储行博
			*/
			new WalkingBlog({

				blogId: newBlogId,
				content: formData.content,
				tags: formData.tags,
				photo: front_path,

			}).save(function(err) {

				if ( err ) {
					return res.send(JSON.stringify({
						result: 'error',
						reason: '发布失败，存储博客时发生错误：' + err,
					}));
				}


				if ( hasPhoto ) {
					// 把临时文件夹下的文件，转移到指定文件夹
					fs.renameSync(photo.path, walkingblogDir + '/' + photoName);
				}


				return res.send(JSON.stringify({
					result: 'success',
					blogId: newBlogId,
					url: '/mylife/' + newBlogId,
				}));

			});

		});

	});

};

/*
	修改行博
*/
exports.editWalkingblog = function(req, res) {

	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}


	var form = new formidable.IncomingForm();
	form.uploadDir = "./server/app/tmp";  

	form.parse(req, function(err, fields, files) {

		if ( err ) {
			return res.send(JSON.stringify({
				result: 'error',
				reason: '修改失败，出现异常：' + err,
			}));
		}

		var formData = {
			id: fields.id,
			content: fields.content || '',
			tags: safeHTML(fields.tags).replace(/,*^/, '') || '',
			isUpdatePhoto: fields.isUpdatePhoto,
		};

		if ( !/\S/.test(formData.content) ) {
			return res.send(JSON.stringify({
				result: 'error',
				reason: '修改失败，行博内容不能为空',
			}));
		}

		WalkingBlog.fetchById(formData.id, function(err, blog) {

			if ( err ) {
				return res.send(JSON.stringify({
					result: 'error',
					reason: '修改失败，出现异常：' + err,
				}));
			}

			if ( !blog ) {
				return res.send(JSON.stringify({
					result: 'error',
					reason: '修改失败，没有找到此博文',
				}));
			}

			blog.tags = formData.tags;
			blog.content = formData.content;

			var photo = files.photo;

			var hasPhoto = !!photo.name;
			var photoName = '',
				front_path = '';

			// 使用更新的图片
			if ( formData.isUpdatePhoto == 'true' ) {

				// 有图片则处理
				if ( hasPhoto ) {

					photoName = Date.now() + '.' + photo.type.split('/')[1];
					front_path = '/walkingblog/' + photoName;
					// 把临时文件夹下的文件，转移到指定文件夹
					fs.renameSync(photo.path, walkingblogDir + '/' + photoName);
					
					if ( blog.photo ) {

						// 删除旧图片
						fs.unlinkSync(dataDir + blog.photo);

					}


				}

				blog.photo = front_path;

			}


			blog.save(function(err) {

				if ( err ) {
					return res.send(JSON.stringify({
						result: 'error',
						reason: '发布失败，存储博客时发生错误：' + err,
					}));
				}

				return res.send(JSON.stringify({
					result: 'success',
					blogId: blog.blogId,
					url: '/mylife/' + blog.blogId,
					photo: blog.photo,
				}));

			});




		});

		


	});

};



/*
	根据页码获取行博
*/
exports.walkingblogByPage = function(req, res) {


	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}


	var page = req.body.page || 1;

	WalkingBlog.fetchByPage(page, function(err, walkingblogs) {

		if ( err ) {
			return errorHandler(err, res);
		}

		return res.json({
			result: 'success',
			walkingblogs: walkingblogs,
		});

	});

};

/*
	获取行博页码总数
*/
exports.walkingblogPage = function(req, res) {


	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}


	WalkingBlog.getCountByAdmin(function(err, number) {

		if ( err ) {
			return errorHandler(err, res);
		}

		return res.json({
			result: 'success',
			page: Math.ceil(number / 50) || 1, // 向上取整，最小为一页
		});

	});

};

/*
	删除行博，及其对应评论
*/
exports.deleteWalkingblog = function(req, res) {


	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}

	WalkingBlog.delete(req.body.id, function(err, walkingblog) {

		if ( err ) {
			return errorHandler(err, res);
		}

		if ( _.isEmpty(walkingblog) ) {
			return res.json({
				result: 'error',
				reason: '删除失败，此行博不存在',
			});
		}

		/*
			删除该行博下的评论
		*/
		Comment.fetchByArticle('wb', walkingblog.blogId, function(err, comments) {

			if ( err ) {
				return errorHandler(err, res);
			}

			_.map(comments, function(comment) {

				comment.remove();

			});

			return res.json({
				result: 'success',
				walkingBlogId: walkingblog.blogId,
				commentCount: comments.length,
			});
 
		});

	});

};

/*
	更新行博评论数
*/
exports.updateWalkingblogComment = function(req, res) {


	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}

	var blogId = req.body.id;
	// 获取评论数
	Comment.fetchWalkingBlogCommentCount(blogId, function(err, count) {

		if ( err ) {
			return errorHandler(err, res);
		}

		// 找到对应博文
		WalkingBlog.fetchByBlogId(blogId, function(err, walkingblog) {

			if ( err ) {
				return errorHandler(err, res);
			}

			walkingblog.numbers.comment = count;

			walkingblog.save(function(err) {

				if ( err ) {
					return errorHandler(err, res);
				}

				return res.json({
					result: 'success',
					count: count,
				});

			});

		});

	});

};

/*
	修改行博状态
*/
exports.changeWalkingblogStatus = function(req, res) {


	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}

	var id = req.body.id;

	// 找到对应博文
	WalkingBlog.fetchById(id, function(err, walkingblog) {

		if ( err ) {
			return errorHandler(err, res);
		}

		walkingblog.isShow = !walkingblog.isShow;

		walkingblog.save(function(err) {

			if ( err ) {
				return errorHandler(err, res);
			}

			return res.json({
				result: 'success',
				show: walkingblog.isShow,
			});

		});

	});


};



	
// 确保存在目录
var bookDir = dataDir + '/book';
fs.existsSync(bookDir) || fs.mkdirSync(bookDir);

/*
	新增书本
*/
exports.addBook = function(req, res) {

	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}

	var form = new formidable.IncomingForm();
	form.uploadDir = "./server/app/tmp";  

	form.parse(req, function(err, fields, files) {

		if ( err ) {
			return res.send(JSON.stringify({
				result: 'error',
				reason: '发布失败，出现异常：' + err,
			}));
		}

		var formData = {
			name: safeHTML(fields.name) || '',
			description: safeHTML(fields.description) || '',
		};

		if ( !/\S/.test(formData.name) ) {
			return res.send(JSON.stringify({
				result: 'error',
				reason: '发布失败，书本名称不能为空',
			}));
		} else if ( !/\S/.test(formData.description) ) {
			return res.send(JSON.stringify({
				result: 'error',
				reason: '发布失败，书本描述不能为空',
			}));
		}

		var photo = files.photo;
		var hasPhoto = !!photo.name;

		// 无图片则不允许发布
		if ( !hasPhoto ) {
			return res.send(JSON.stringify({
				result: 'error',
				reason: '发布失败，书本配图不能为空',
			}));
		}

		var photoName = Date.now() + '.' + photo.type.split('/')[1];
		var front_path = '/book/' + photoName;
		
		
		// 找到最后一个书本的ID，+1
		Book.findLastOne(function(err, lastBook) {

			if ( err ) {
				return errorHandler(err, res);
			}

			var newBookId = 1;

			if ( !_.isEmpty(blastBook) ) {
				newBookId = lastBook[0].bookId + 1;
			}

			/*
				存储书本
			*/
			new Book({

				bookId: newBookId,
				name: formData.name,
				description: formData.description,
				photo: front_path,

			}).save(function(err) {

				if ( err ) {
					return res.send(JSON.stringify({
						result: 'error',
						reason: '发布失败，存储书本时发生错误：' + err,
					}));
				}


				// 把临时文件夹下的文件，转移到指定文件夹
				fs.renameSync(photo.path, bookDir + '/' + photoName);


				return res.send(JSON.stringify({
					result: 'success',
					bookId: newBookId,
					url: '/book',
				}));

			});

		});

	});

};

/*
	修改书本
*/
exports.editBook = function(req, res) {

	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}

	var form = new formidable.IncomingForm();
	form.uploadDir = "./server/app/tmp";  

	form.parse(req, function(err, fields, files) {

		if ( err ) {
			return res.send(JSON.stringify({
				result: 'error',
				reason: '修改失败，出现异常：' + err,
			}));
		}

		var formData = {
			id: fields.id,
			name: safeHTML(fields.name) || '',
			description: safeHTML(fields.description) || '',
		};

		if ( !/\S/.test(formData.name) ) {
			return res.send(JSON.stringify({
				result: 'error',
				reason: '发布失败，书本名称不能为空',
			}));
		} else if ( !/\S/.test(formData.description) ) {
			return res.send(JSON.stringify({
				result: 'error',
				reason: '发布失败，书本描述不能为空',
			}));
		}

	

		Book.fetchById(formData.id, function(err, book) {

			if ( err ) {
				return res.send(JSON.stringify({
					result: 'error',
					reason: '修改失败，出现异常：' + err,
				}));
			}

			if ( !book ) {
				return res.send(JSON.stringify({
					result: 'error',
					reason: '修改失败，没有找到此博文',
				}));
			}

			book.name = formData.name;
			book.description = formData.description;

			var photo = files.photo;
			var hasPhoto = !!photo.name;
			
			var photoName = '',
				front_path = '';



			// 有图片则处理
			if ( hasPhoto ) {

				photoName = Date.now() + '.' + photo.type.split('/')[1];
				front_path = '/book/' + photoName;
				// 把临时文件夹下的文件，转移到指定文件夹
				fs.renameSync(photo.path, bookDir + '/' + photoName);
				
				if ( book.photo ) {

					// 删除旧图片
					fs.unlinkSync(dataDir + book.photo);

				}

				book.photo = front_path;


			}

			

			book.save(function(err) {

				if ( err ) {
					return res.send(JSON.stringify({
						result: 'error',
						reason: '发布失败，存储博文时发生错误：' + err,
					}));
				}

				return res.send(JSON.stringify({
					result: 'success',
					bookId: book.bookId,
					url: '/book/',
					photo: book.photo
				}));

			});




		});

		


	});

};


/*
	根据页码获取书本
*/
exports.bookByPage = function(req, res) {


	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}


	var page = req.body.page || 1;

	Book.fetchByPage(page, function(err, books) {

		if ( err ) {
			return errorHandler(err, res);
		}

		return res.json({
			result: 'success',
			books: books,
		});

	});

};

/*
	获取书本页码总数
*/
exports.bookPage = function(req, res) {


	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}


	Book.getCount(function(err, number) {

		if ( err ) {
			return errorHandler(err, res);
		}

		return res.json({
			result: 'success',
			page: Math.ceil(number / 50) || 1, // 向上取整，最小为一页
		});

	});

};

/*
	删除书本
*/
exports.deleteBook = function(req, res) {


	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}

	Book.delete(req.body.id, function(err, book) {

		if ( err ) {
			return errorHandler(err, res);
		}

		if ( _.isEmpty(book) ) {
			return res.json({
				result: 'error',
				reason: '删除失败，此行博不存在',
			});
		}


		return res.json({
			result: 'success',
			bookId: book.bookId,
		});
 

	});

};





var blogDir = dataDir + '/blog';
fs.existsSync(blogDir) || fs.mkdirSync(blogDir);

/*
	博文上传图片，返回URL
*/
exports.uploadPhoto =  function(req, res) {

	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}


	var form = new formidable.IncomingForm();
	form.uploadDir = "./server/app/tmp";  

	form.parse(req, function(err, fields, files) {

		if ( err ) {
			return res.send(JSON.stringify({
				result: 'error',
				reason: '上传图片失败，出现异常：' + err,
			}));
		}

		var photo = files.photo;
		var hasPhoto = !!photo.name;
		var photoName = '',
			front_path = '';

		// 图片为空则返回错误信息
		if ( !hasPhoto ) {

			return res.send(JSON.stringify({
				result: 'error',
				reason: '请选择图片',
			}));

		}
		
		photoName = Date.now() + '.' + photo.type.split('/')[1];
		front_path = '/blog/' + photoName;
		

		// 把临时文件夹下的文件，转移到指定文件夹
		fs.renameSync(photo.path, blogDir + '/' + photoName);


		return res.send(JSON.stringify({
			result: 'success',
			url: front_path,
		}));


	});


};


/*
	发布博文，要连表查询标签和分类，发邮件
*/
exports.addBlog = function(req, res) {

	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}

	var formData = {
		title: req.body.title,
		category: req.body.category,
		summary: req.body.summary,
		tags: req.body.tags,
		isNotice: req.body.isNotice,
		content: req.body.content,
		markdown: req.body.markdown,
	};

	// 表单验证
	if ( !/\S/.test(formData.title) ) {

		return res.json({
			result: 'error',
			reason: '博文标题不能为空',
		});

	} else if ( !/\S/.test(formData.category) ) {

		return res.json({
			result: 'error',
			reason: '博文分类不能为空',
		});

	} else if ( !/\S/.test(formData.summation) ) {

		return res.json({
			result: 'error',
			reason: '博文摘要不能为空',
		});

	} else if ( !/\S/.test(formData.content) ) {

		return res.json({
			result: 'error',
			reason: '博文内容不能为空',
		});

	}


	// 找到最新一篇博文，id +1
	Blog.findLastOne(function(err, blog) {

		if ( err ) {
			return errorHandler(err, res);
		}

		var newBlogId = 1;

		if ( !_.isEmpty(blog) ) {
			newBlogId = blog[0].blogId + 1;
		}

		new Blog({
			blogId: newBlogId,
			title: formData.title,
			summary: formData.summary,
			markdown: formData.markdown,
			content: formData.content,
			category: formData.category,
			tags: formData.tags,
		}).save(function(err) {

			if ( err ) {
				return res.json({
					result: 'error',
					reason: '存储博文时发生异常：' + err,
				});
			}

			// 分类表
			Category.fetchByCateName(formData.category, function(err, category) {

				// 分类不存在，则新建一个
				if ( !category ) {

					new Category({
						cateName: formData.category,
						blogs: [newBlogId],
					}).save();
					
				} else { // 存在，则push博文id

					_.pull(category.blogs, newBlogId).push(newBlogId);

					category.save();

				}

			});

			// 标签表
			var tags = formData.tags.split(',');

			// 遍历存储
			_.map(tags, function(tagName) {

				Tag.fetchByTagName(tagName, function(err, tag) {

					// 分类不存在，则新建一个
					if ( !tag ) {

						new Tag({
							tagName: tagName,
							blogs: [newBlogId],
						}).save();
						
					} else { // 存在，则push博文id

						_.pull(tag.blogs, newBlogId).push(newBlogId);

						tag.save();

					}

				});

			});

			// 发送邮件
			Member.fetchAll(function(err, members) {

				if ( err ) {
					console.log('发送邮件前获取成员信息失败：' + err);
					return false;
				}

				var i = 0,
					perMailTime = 400; // 每封email的发送间隔时间


				_.map(members, function(member) {

					// 异步执行，防止短时间内出现连接数太多的情况
					setTimeout(function() {

						var opts = {
							to: member.email,
							data: {
								currentTime: dateFormat(Date.now(), 'YYYY-MM-DD hh:mm:ss'),
								nickname: member.nickname,
								blog: {
									blogId: newBlogId,
									summary: formData.summary,
									title: formData.title,
									category: formData.category,
									tags: formData.tags,
								},
							}
						}

						mail.newBlogNotice(opts);
						
					}, perMailTime * i++);


				});

			});


			


			// 存储成功
			return res.json({
				result: 'success',
				blogId: newBlogId,
				url: '/article/' + newBlogId,
			});

		});

	});


};

/*
	修改博文，更新标签和分类
*/
exports.editBlog = function(req, res) {

	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}

	var formData = {
		id: req.body.id,
		title: req.body.title,
		category: req.body.category,
		summary: req.body.summary,
		tags: req.body.tags,
		isNotice: req.body.isNotice,
		content: req.body.content,
		markdown: req.body.markdown,
	};

	// 表单验证
	if ( !/\S/.test(formData.id) ) {

		return res.json({
			result: 'error',
			reason: '请先选择要修改的博文',
		});

	} else if ( !/\S/.test(formData.title) ) {

		return res.json({
			result: 'error',
			reason: '博文标题不能为空',
		});

	} else if ( !/\S/.test(formData.category) ) {

		return res.json({
			result: 'error',
			reason: '博文分类不能为空',
		});

	} else if ( !/\S/.test(formData.summation) ) {

		return res.json({
			result: 'error',
			reason: '博文摘要不能为空',
		});

	} else if ( !/\S/.test(formData.content) ) {

		return res.json({
			result: 'error',
			reason: '博文内容不能为空',
		});

	}

	// 通过_id找到对应的博文
	Blog.fetchById(formData.id, function(err, blog) {

		if ( err ) {
			return errorHandler(err, res);
		}

		if ( _.isEmpty(blog) ) {
			return res.json({
				result: 'error',
				reason: '数据库中找不到对应博文',
			});
		}

		// 如果分类发生改变并且博文为公开状态，则修改分类
		if ( blog.category != formData.category && blog.isShow) {

			// 修改旧分类
			Category.fetchByCateName(blog.category, function(err, category) {

				// 分类不存在，则不操作
				if ( !category ) {

					return false;
					
				} else { // 存在，则pull博文id

					_.pull(category.blogs, blog.blogId);
					category.markModified('blogs');
					category.save();

				}

			});

			// 修改新分类
			Category.fetchByCateName(formData.category, function(err, category) {

				// 分类不存在，则新建一个
				if ( !category ) {

					new Category({
						cateName: formData.category,
						blogs: [blog.blogId],
					}).save();
					
				} else { // 存在，则push博文id

					_.pull(category.blogs, blog.blogId).push(blog.blogId);
					category.markModified('blogs');
					category.save();

				}

			});

		}

		// 如果标签发生改变并且博文为公开状态，则修改标签
		if ( blog.tags != formData.tags && blog.isShow) {

			// 修改旧标签
			_.map(blog.tags.split(','), function(tagName) {

				Tag.fetchByTagName(tagName, function(err, tag) {

					// 找不到对应标签，则不操作
					if ( _.isEmpty(tag) ) {
						return false;
					}

					// pull
					_.pull(tag.blogs, blog.blogId);
					tag.markModified('blogs');
					tag.save();

				});

			});

			// 修改新标签
			_.map(formData.tags.split(','), function(tagName) {

				Tag.fetchByTagName(tagName, function(err, tag) {

					// 不存在，则新建一个标签
					if ( !tag ) {

						new Tag({
							tagName: tagName,
							blogs: [blog.blogId],
						}).save();
						
					} else { // 存在，则push博文id

						_.pull(tag.blogs, blog.blogId).push(blog.blogId);
						tag.markModified('blogs');
						tag.save();
					}

				});

			});

		}

		blog.title = formData.title;
		blog.summary = formData.summary;
		blog.markdown = formData.markdown;
		blog.content = formData.content;
		blog.category = formData.category;
		blog.tags = formData.tags;
		blog.time.updateAt = Date.now();

		blog.markModified('time');


		blog.save(function(err) {

			if ( err ) {
				return res.json({
					result: 'error',
					reason: '存储博文时发生异常：' + err,
				});
			}

			// 存储成功
			return res.json({
				result: 'success',
				url: '/article/' + blog.blogId,
			});

		});


	});


};



/*
	根据页码获取博客
*/
exports.blogByPage = function(req, res) {


	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}


	var page = req.body.page || 1;

	Blog.fetchByPageAdmin(page, function(err, blogs) {

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
	获取博客页码总数
*/
exports.blogPage = function(req, res) {


	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}


	Blog.getCountByAdmin(function(err, number) {

		if ( err ) {
			return errorHandler(err, res);
		}

		return res.json({
			result: 'success',
			page: Math.ceil(number / 50) || 1, // 向上取整，最小为一页
		});

	});

};

/*
	删除博文，及其对应评论，修改分类，标签
*/
exports.deleteBlog = function(req, res) {


	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}

	Blog.delete(req.body.id, function(err, blog) {

		if ( err ) {
			return errorHandler(err, res);
		}

		if ( _.isEmpty(blog) ) {
			return res.json({
				result: 'error',
				reason: '删除失败，此博客不存在',
			});
		}

		/*
			删除该博客下的评论
		*/
		Comment.fetchByArticle('blog', blog.blogId, function(err, comments) {

			if ( err ) {
				return errorHandler(err, res);
			}

			_.map(comments, function(comment) {

				comment.remove();

			});
			
		});

		/*
			修改分类博文数
		*/
		Category.fetchByCateName(blog.category, function(err, category) {

			if ( _.isEmpty(category) ) {
				return false;
			}

			_.pull(category.blogs, blog.blogId);

			category.markModified('blogs');
			category.save();

		});

		/*
			修改标签博文数
		*/
		_.map(blog.tags.split(','), function(tagName) {

			Tag.fetchByTagName(tagName, function(err, tag) {

				if ( _.isEmpty(tag) ) {
					return false;
				}

				_.pull(tag.blogs, blog.blogId);
				tag.markModified('blogs');
				tag.save();

			});

		});


			

		return res.json({
			result: 'success',
			blogId: blog.blogId,
		});

	});

};

/*
	更新博客评论数
*/
exports.updateBlogComment = function(req, res) {


	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}

	var blogId = req.body.id;
	// 获取评论数
	Comment.fetchBlogCommentCount(blogId, function(err, count) {

		if ( err ) {
			return errorHandler(err, res);
		}

		// 找到对应博文
		Blog.fetchByBlogId(blogId, function(err, blog) {

			if ( err ) {
				return errorHandler(err, res);
			}

			blog.numbers.comment = count;

			blog.save(function(err) {

				if ( err ) {
					return errorHandler(err, res);
				}

				return res.json({
					result: 'success',
					count: count,
				});

			});

		});

	});

};

/*
	修改博文状态，并修改分类和标题表对应的博文数量
*/
exports.changeBlogStatus = function(req, res) {


	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}

	var id = req.body.id;

	// 找到对应博文
	Blog.fetchById(id, function(err, blog) {

		if ( err ) {
			return errorHandler(err, res);
		}

		blog.isShow = !blog.isShow;

		blog.save(function(err) {

			if ( err ) {
				return errorHandler(err, res);
			}


			// 私密状态
			if ( !blog.isShow ) {

				/*
					修改分类博文数
				*/
				Category.fetchByCateName(blog.category, function(err, category) {

					if ( _.isEmpty(category) ) {
						return false;
					}

					_.pull(category.blogs, blog.blogId);

					category.markModified('blogs');
					category.save();

				});

				/*
					修改标签博文数
				*/
				_.map(blog.tags.split(','), function(tagName) {

					Tag.fetchByTagName(tagName, function(err, tag) {

						if ( _.isEmpty(tag) ) {
							return false;
						}

						_.pull(tag.blogs, blog.blogId);
						tag.markModified('blogs');
						tag.save();

					});

				});

			} else { // 公开状态

				// 分类表
				Category.fetchByCateName(blog.category, function(err, category) {


					_.pull(category.blogs, blog.blogId).push(blog.blogId);

					category.save();


				});

				// 标签表
				var tags = blog.tags.split(',');

				// 遍历存储
				_.map(tags, function(tagName) {

					Tag.fetchByTagName(tagName, function(err, tag) {

						_.pull(tag.blogs, blog.blogId).push(blog.blogId);

						tag.save();


					});

				});

			}


			return res.json({
				result: 'success',
				show: blog.isShow,
			});

		});

	});


};


/*
	博文详情
*/
exports.blogDetail = function(req, res) {

	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}

	var id = req.body.id;

	Blog.fetchById(id, function(err, blog) {

		if ( err ) {
			return errorHandler(err, res);
		}

		if ( _.isEmpty(blog) ) {

			return res.json({
				result: 'error',
				reasion: '找不到此博文',
			});

		}

		return res.json({
			result: 'success',
			blog: blog,
		});

	});


};


/*
	请求分类列表
*/
exports.loadCategories = function(req, res) {

	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}

	Category.fetchAll(function(err, categories) {

		if ( err ) {
			return errorHandler(err, res);
		}

		return res.json({
			result: 'success',
			categories: categories,
		});

	});

};

/*
	通过分类查看博文
*/
exports.blogByCategory = function(req, res) {

	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}

	var cateName = req.body.cateName;

	if ( !/\S/.test(cateName) ) {

		return res.json({
			result: 'error',
			reason: '分类名不能为空'
		});

	}



	Blog.fetchByCategory(cateName, function(err, blogs) {

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
	更新分类博文数，包含公开火或私密状态的
*/
exports.updateCateBlog = function(req, res) {

	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}

	var cateName = req.body.cateName;

	if ( !/\S/.test(cateName) ) {

		return res.json({
			result: 'error',
			reason: '分类名不能为空'
		});

	}


	Blog.fetchCountByCategory(cateName, function(err, count) {

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
	新增分类
*/
exports.addCategory = function(req, res) {

	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}

	var cateName = req.body.cateName;

	if ( !/\S/.test(cateName) ) {

		return res.json({
			result: 'error',
			reason: '分类名不能为空'
		});

	}


	Category.fetchByCateName(cateName, function(err, category) {

		if ( err ) {
			return errorHandler(err, res);
		}

		// 分类已经存在
		if ( category ) {

			return res.json({
				result: 'error',
				reason: '该分类已经存在',
			});

		}

		new Category({
			cateName: cateName,
			blogs: [],
		}).save(function(err) {

			if ( err ) {
				return res.json({
					result: 'error',
					reason: '存储分类时发生异常：' + err,
				});
			}

			return res.json({
				result: 'success',
				cateName: cateName,
			});

		});

		

	});

};

/*
	修改分类名，并修改该分类下所有博文的分类
*/
exports.editCategory = function(req, res) {

	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}

	var formData = {
		oldCate: req.body.oldCate,
		newCate: req.body.newCate,
	}

	if ( !/\S/.test(formData.oldCate) ) {

		return res.json({
			result: 'error',
			reason: '旧分类名不能为空'
		});

	} else if ( !/\S/.test(formData.newCate) ) {

		return res.json({
			result: 'error',
			reason: '新分类名不能为空'
		});

	}

	Category.fetchByCateName(formData.oldCate, function(err, oldCategory) {

		if ( err ) {
			return errorHandler(err, res);
		}

		if ( !oldCategory ) {
			return res.json({
				result: 'error',
				reason: '目标分类不存在',
			});
		}

		Blog.fetchByCategory(formData.oldCate, function(err, blogs) {

			if ( err ) {
				return errorHandler(err, res);
			}

			// 查询新分类名是否已存在，存在则合并
			Category.fetchByCateName(formData.newCate, function(err, newCategory) {

				if ( err ) {
					return errorHandler(err, res);
				}

				// 不存在，则直接修改旧分类名字与对应博文的分类名
				if ( !newCategory ) {

					// 修改对应博文分类名
					_.map(blogs, function(blog) {

						blog.category = formData.newCate;
						blog.save();

					});

					// 保存旧分类
					oldCategory.cateName = formData.newCate;
					oldCategory.save();

					return res.json({
						result: 'success',
						status: '新分类不存在，修改旧分类名为新分类名',
						count: blogs.length,
					});

				} else { // 存在，则删除旧分类，并将博文移到新分类上

					

					// 修改对应博文分类名，并将博文移到新分类上，
					_.map(blogs, function(blog) {

						blog.category = formData.newCate;
						_.pull(newCategory.blogs, blog.blogId).push(blog.blogId);
						blog.save();

					});

					// 删除旧分类
					oldCategory.remove();

					
					newCategory.markModified('blogs');
					newCategory.save();

					return res.json({
						result: 'success',
						status: '新分类已存在，删除旧分类，并将旧分类下的博文合并至新分类',
						count: blogs.length,
					});

				}




			});

			

		});


	});

};

/*
	删除分类
*/
exports.deleteCategory = function(req, res) {

	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}

	var cateName = req.body.cateName;

	if ( !/\S/.test(cateName) ) {

		return res.json({
			result: 'error',
			reason: '分类名不能为空'
		});

	}


	Category.fetchByCateName(cateName, function(err, category) {

		if ( err ) {
			return errorHandler(err, res);
		}

		// 分类已经存在
		if ( !category ) {

			return res.json({
				result: 'error',
				reason: '该分类不存在',
			});

		} else if ( category.blogs.length ) {

			return res.json({
				result: 'error',
				reason: '该分类下博文不为空',
			});

		}

		category.remove(function(err) {

			if ( err ) {
				return res.json({
					result: 'error',
					reason: '删除分类时发生异常：' + err,
				});
			}

			return res.json({
				result: 'success',
				cateName: cateName,
			});

		});

		

		

	});

};



/*
	请求标签列表
*/
exports.loadTags = function(req, res) {

	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}

	Tag.fetchAll(function(err, tags) {

		if ( err ) {
			return errorHandler(err, res);
		}

		return res.json({
			result: 'success',
			tags: tags,
		});

	});

};

/*
	通过标签查看博文
*/
exports.blogByTag = function(req, res) {

	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}

	var tagName = req.body.tagName;

	if ( !/\S/.test(tagName) ) {

		return res.json({
			result: 'error',
			reason: '标签名不能为空'
		});

	}



	Blog.fetchByTag(tagName, function(err, blogs) {

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
	更新标签博文数，包含公开或私密状态的
*/
exports.updateTagBlog = function(req, res) {

	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}

	var tagName = req.body.tagName;

	if ( !/\S/.test(tagName) ) {

		return res.json({
			result: 'error',
			reason: '标签名不能为空'
		});

	}


	Blog.fetchCountByTag(tagName, function(err, count) {

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
	新增标签
*/
exports.addTag = function(req, res) {

	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}

	var tagName = req.body.tagName;

	if ( !/\S/.test(tagName) && tagName != 'undefined') {

		return res.json({
			result: 'error',
			reason: '标签名不能为空'
		});

	}


	Tag.fetchByTagName(tagName, function(err, tag) {

		if ( err ) {
			return errorHandler(err, res);
		}

		// 分类已经存在
		if ( tag ) {

			return res.json({
				result: 'error',
				reason: '该标签已经存在',
			});

		}

		new Tag({
			tagName: tagName,
			blogs: [],
		}).save(function(err) {

			if ( err ) {
				return res.json({
					result: 'error',
					reason: '存储标签时发生异常：' + err,
				});
			}

			return res.json({
				result: 'success',
				tagName: tagName,
			});

		});

		

	});

};

/*
	修改标签名，并修改该标签下所有博文的标签
*/
exports.editTag = function(req, res) {

	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}

	var formData = {
		oldTag: req.body.oldTag,
		newTag: req.body.newTag,
	}

	if ( !/\S/.test(formData.oldTag) ) {

		return res.json({
			result: 'error',
			reason: '旧标签名不能为空'
		});

	} else if ( !/\S/.test(formData.newTag) ) {

		return res.json({
			result: 'error',
			reason: '新标签名不能为空'
		});

	}

	Tag.fetchByTagName(formData.oldTag, function(err, oldTag) {

		if ( err ) {
			return errorHandler(err, res);
		}

		if ( !oldTag ) {
			return res.json({
				result: 'error',
				reason: '目标标签不存在',
			});
		}

		Blog.fetchByTag(formData.oldTag, function(err, blogs) {

			if ( err ) {
				return errorHandler(err, res);
			}

			// 查询新标签名是否已存在，存在则合并
			Tag.fetchByTagName(formData.newTag, function(err, newTag) {

				if ( err ) {
					return errorHandler(err, res);
				}

				var reg_tpl = '(^{{content}},)|(,{{content}}$)|(,{{content}},)|(^{{content}}$)';
				var reg = new RegExp(reg_tpl.replace(/{{content}}/g, formData.oldTag), 'g');

				// 不存在，则直接修改旧标签名字与对应博文的标签名
				if ( !newTag ) {

					
					// 修改对应博文标签名
					_.map(blogs, function(blog) {

						
						blog.tags = blog.tags.replace(reg, function(match) {
							return match.replace(formData.oldTag, formData.newTag);
						});
						blog.save();

					});

					// 保存旧分类
					oldTag.tagName = formData.newTag;
					oldTag.save();

					return res.json({
						result: 'success',
						status: '新标签不存在，修改旧标签名为新标签名',
						count: blogs.length,
					});

				} else { // 存在，则删除旧标签，并将博文移到新标签上

					var newReg = new RegExp(reg_tpl.replace(/{{content}}/g, formData.newTag), 'g');

					// 修改对应博文标签名，并将博文移到新标签上，
					_.map(blogs, function(blog) {

						blog.tags = blog.tags
							.replace(newReg, function(match) { // 防止当前博文已有新标签，先替换为空
								return match.replace(formData.newTag, '');

							})
							.replace(/,+/, ',') // 防止有多余的逗号
							.replace(reg, function(match) {
								return match.replace(formData.oldTag, formData.newTag);
							})
							.replace(/(^,)|(,$)/, '');

						// 新标签push id
						_.pull(newTag.blogs, blog.blogId);
						newTag.blogs.push(blog.blogId);
						blog.save();

					});

					// 删除旧标签
					oldTag.remove();
					
					newTag.blogs = newTag.blogs;
					newTag.markModified('blogs');
					newTag.save();

					return res.json({
						result: 'success',
						status: '新标签已存在，删除旧标签，并将旧标签下的博文合并至新标签',
						count: blogs.length,
					});

				}




			});

			

		});


	});

};

/*
	删除标签
*/
exports.deleteTag = function(req, res) {

	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}

	var tagName = req.body.tagName;

	if ( !/\S/.test(tagName) ) {

		return res.json({
			result: 'error',
			reason: '标签名不能为空'
		});

	}


	Tag.fetchByTagName(tagName, function(err, tag) {

		if ( err ) {
			return errorHandler(err, res);
		}

		// 分类已经存在
		if ( !tag ) {

			return res.json({
				result: 'error',
				reason: '该标签不存在',
			});

		} else if ( tag.blogs.length ) {

			return res.json({
				result: 'error',
				reason: '该标签下博文不为空',
			});

		}

		tag.remove(function(err) {

			if ( err ) {
				return res.json({
					result: 'error',
					reason: '删除标签时发生异常：' + err,
				});
			}

			return res.json({
				result: 'success',
				tagName: tagName,
			});

		});

		

		

	});

};













function errorHandler(err, res) {
	console.log('backstage.js: ', err);
	return res.json({
		result: 'error',
		reason: '数据库错误', 
	});
}


function checkSession(req) {

	if ( !req.session.user ) {
		return false;
	} 

	return req.session.user.username === credentials.admin.username && req.session.user.password === credentials.admin.password;
};

function unlogin(res) {
	return res.json({
		result: 'error',
		reason: '操作失败，你没有权限',
	});
}

