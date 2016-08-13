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

/* 邮件 */
var mail = require('../sendEmail.js');

/* 日期格式化 */
var dateFormat = require('../utils/dateFormat.js');
var safeHTML = require('../utils/safeHTML.js');

var credentials = require('../credentials.js');


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
			url: '/admin/comment',
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

			Blog.findByBlogId(comment.host, function(err, blog) {

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

/*
	发布行博
*/

// 确保存在目录
var dataDir = './server/app';
var walkingblogDir = dataDir + '/walkingblog';
fs.existsSync(dataDir) || fs.mkdirSync(dataDir);
fs.existsSync(walkingblogDir) || fs.mkdirSync(walkingblogDir);

exports.addWalkingblog = function(req, res) {

	var form = new formidable.IncomingForm();
	form.uploadDir = "./server/tmp";  

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

			var newBlogId = lastBlog[0].blogId + 1;

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

	var form = new formidable.IncomingForm();
	form.uploadDir = "./server/tmp";  

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
	获取订阅用户页码总数
*/
exports.walkingblogPage = function(req, res) {


	if ( !checkSession(req) ) {
		
		return unlogin(res);

	}


	WalkingBlog.getCount(function(err, number) {

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

exports.addBook = function(req, res) {

	var form = new formidable.IncomingForm();
	form.uploadDir = "./server/tmp";  

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

			var newBookId = lastBook[0].bookId + 1;

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
	修改行博
*/
exports.editBook = function(req, res) {

	var form = new formidable.IncomingForm();
	form.uploadDir = "./server/tmp";  

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
	根据页码获取行博
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
	获取订阅用户页码总数
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

