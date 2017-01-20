var mongoose = require('mongoose');
var _ = require('lodash');
var safeHTML = require('../utils/safeHTML.js');

/* 数据表 */
var Book = require('../models/Book.js');

/* 邮件 */
var mail = require('../sendEmail.js');

/* 日期格式化 */
var dateFormat = require('../utils/dateFormat.js');

var getUserInfo = require('../utils/getUserInfo.js');


var log4js = require('../loggerConfig.js');
var behaviorLogger = log4js.getLogger('BEHAVIOR');
/*
	请求书单列表
*/
exports.bookList = function(req, res) {

	Book.fetchAllBooks(function(err, books) {

		if (err) {
			return errorHandler(err, res);
		}

		return res.json({
			result: 'success',
			books: books,
		});

	});

};

/*
	书单点赞
*/
exports.bookLike = function(req, res) {

	var bookId = req.body.bookId;

	Book.findByBookId(bookId, function(err, book) {

		if ( err ) {
			return errorHandler(err, res);
		}

		if ( _.isEmpty(book) ) {
			return res.json({
				result: 'error',
				reason: '推荐失败，数据库无此书本信息',
			});
		}

		book.recommend++;

		book.save(function(err) {

			if ( err ) {
				return errorHandler(err, res);
			}

			behaviorLogger.info('书本《' + book.name + '》点赞数增加（' + book.recommend + '），点赞用户：' + getUserInfo(req) );

			return res.json({
				result: 'success',
				bookId: book.bookId,
			});

		});


	});

};



function errorHandler(err, res) {
	console.log(err);
	return res.json({
		result: 'error',
		reason: '数据库错误', 
	});
}
