var mongoose = require('mongoose');
var _ = require('lodash');
var safeHTML = require('../utils/safeHTML.js');

/* 数据表 */
var Tag = require('../models/Tag.js');
var Category = require('../models/Category.js');
var Blog = require('../models/Blog.js');

/* 邮件 */
var mail = require('../sendEmail.js');

/* 日期格式化 */
var dateFormat = require('../utils/dateFormat.js');

/*
	请求分类列表
*/
exports.tags = function(req, res) {

	Tag.fetchAll(function(err, tags) {

		if ( err ) {
			return errorHandler(err, res);
		}

		return res.json({
			result: 'success',
			tags: tags || [],
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