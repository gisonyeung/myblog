var mongoose = require('mongoose');
var _ = require('lodash');
var safeHTML = require('../utils/safeHTML.js');

/* 数据表 */
var Book = require('../models/Book.js');

/* 邮件 */
var mail = require('../sendEmail.js');

/* 日期格式化 */
var dateFormat = require('../utils/dateFormat.js');


/*
	请求书单列表
*/
exports.bookList = function(req, res) {

	Book.find(function(err, books) {
		if ( !books.length ) {

			new Book({
				bookId: 1,
				name: 'Javascript高级程序设计1',
				photo: '/book/1.jpg',
				description: '夏夜皇陵，紅牆之內，四方須彌，螭首吐螢。\n南京明孝陵丨Canon EOS-1D X + Sigma 35mm f/1.4 DG HSM',
				time: Date.now(),
				recommend: 0,
			}).save();
			new Book({
				bookId: 2,
				name: 'Javascript高级程序设计2',
				photo: '/book/1.jpg',
				description: '夏夜皇陵，紅牆之內，四方須彌，螭首吐螢。\n南京明孝陵丨Canon EOS-1D X + Sigma 35mm f/1.4 DG HSM',
				time: Date.now(),
				recommend: 0,
			}).save();
			new Book({
				bookId: 3,
				name: 'Javascript高级程序设计3',
				photo: '/book/1.jpg',
				description: '夏夜皇陵，紅牆之內，四方須彌，螭首吐螢。\n南京明孝陵丨Canon EOS-1D X + Sigma 35mm f/1.4 DG HSM',
				time: Date.now(),
				recommend: 0,
			}).save();
			new Book({
				bookId: 4,
				name: 'Javascript高级程序设计4',
				photo: '/book/1.jpg',
				description: '夏夜皇陵，紅牆之內，四方須彌，螭首吐螢。\n南京明孝陵丨Canon EOS-1D X + Sigma 35mm f/1.4 DG HSM',
				time: Date.now(),
				recommend: 0,
			}).save();
			new Book({
				bookId: 5,
				name: 'Javascript高级程序设计5',
				photo: '/book/1.jpg',
				description: '夏夜皇陵，紅牆之內，四方須彌，螭首吐螢。\n南京明孝陵丨Canon EOS-1D X + Sigma 35mm f/1.4 DG HSM',
				time: Date.now(),
				recommend: 0,
			}).save();
			new Book({
				bookId: 6,
				name: 'Javascript高级程序设计6',
				photo: '/book/1.jpg',
				description: '夏夜皇陵，紅牆之內，四方須彌，螭首吐螢。\n南京明孝陵丨Canon EOS-1D X + Sigma 35mm f/1.4 DG HSM',
				time: Date.now(),
				recommend: 0,
			}).save();
		}
	});

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
