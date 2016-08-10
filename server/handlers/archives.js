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


Tag.find(function(err, tags) {

	if (err) {
		return false;
	}

	if ( !tags.length ) {
		new Tag({
			tagId: 1,
			tagName: 'Javascript',
			blogs: [1, 2, 3, 4, 5, 6],
			time: {
				createAt: Date.now(),
				updateAt: Date.now(),
			},
		}).save();

	}

});

Category.find(function(err, cates) {

	if (err) {
		return false;
	}

	if ( !cates.length ) {
		new Category({
			cateId: 1,
			cateName: 'HTML与CSS',
			blogs: [1, 2, 3, 4, 5],
			time: {
				createAt: Date.now(),
				updateAt: Date.now(),
			},
		}).save();

	}

});





/*
	根据条件归档
*/
exports.archiveCondition = function(req, res) {

	var search = req.body.search;

	/* 按标签归档 */
	if( search.type == 'tag' ) {

		Tag.fetchByTagName(search.tag, function(err, tag) {

			if ( err ) {
				return errorHandler(err, res);
			}

			if ( !tag ) {
				return res.json({
					result: 'success',
					archives: [],
				});
			}

			var blogs = tag.blogs;
			var archivesData = [],
				promiseList = [];

			_.map(blogs, function(blogId) {

				var _promise = new Promise(function(resolve, reject) {

					Blog.getArchivesByBlogId(blogId, function(err, blog) {

						if ( err ) {
							reject(err);
							return false;
						}

						// 不为空（为空则表示博文isShow为false），存进归档档案里
						if ( !_.isEmpty(blog) ) {
							archivesData.push(blog);
						}

						resolve(blog);


					});

				});

				promiseList.push(_promise);

			});

			// 博文搜索完毕，这里处理博文
			Promise.all(promiseList)
				.then(function(resultList) {

					return res.json({
						result: 'success',
						archives: ArchiveFormat(archivesData),
					});
					
				});



		});

	} else if( search.type == 'category' ) { /* 按分类归档 */

		Category.fetchByCateName(search.category, function(err, cate) {

			if ( err ) {
				return errorHandler(err, res);
			}

			if ( !cate ) {
				return res.json({
					result: 'success',
					archives: [],
				});
			}

			var blogs = cate.blogs;
			var archivesData = [],
				promiseList = [];

			_.map(blogs, function(blogId) {

				var _promise = new Promise(function(resolve, reject) {

					Blog.getArchivesByBlogId(blogId, function(err, blog) {

						if ( err ) {
							reject(err);
							return false;
						}

						// 不为空（为空则表示博文isShow为false），存进归档档案里
						if ( !_.isEmpty(blog) ) {
							archivesData.push(blog);
						}

						resolve(blog);


					});

				});

				promiseList.push(_promise);

			});

			// 博文搜索完毕，这里处理博文
			Promise.all(promiseList)
				.then(function(resultList) {

					return res.json({
						result: 'success',
						archives: ArchiveFormat(archivesData),
					});
					
				});



		});

	} else if ( search.type == 'date' ) { /* 按日期归档 */

		var date = search.date,
			year = date.substring(0, 4),
			month = parseInt(date.substring(4, 6), 10);

		month = month < 10 ? '0' + month : month;

		// 超出年份或月份
		if ( illegalYear(year) || illegalMonth(month) ) {

			return res.json({
				result: 'success',
				archives: [],
			});

		}


		// 月份为空，只根据年份获取
		if ( !month ) {

			Blog.getYearBlog(year, function(err, blogs) {

				if ( err ) {
					return errorHandler(err, res);
				}

				return res.json({
					result: 'success',
					archives: ArchiveFormat(blogs),
				});

			});

		} else { // 根据月份获取

			Blog.getMonthBlog(year, month, function(err, blogs) {

				if ( err ) {
					return errorHandler(err, res);
				}

				return res.json({
					result: 'success',
					archives: ArchiveFormat(blogs),
				});

			});

		}

	} else if ( search.type == 'search' ) { /* 关键词归档 */

		var keyword = search.q.trim();

		// 为空，则返回全部文章
		if ( !keyword ) {

			Blog.getArchives(function(err, blogs) {

				if ( err ) {
					return errorHandler(err, res);
				}

				return res.json({
					result: 'success',
					archives: ArchiveFormat(blogs),
				});

			});

		} else {

			Blog.getArchivesByFuzzy(keyword.replace(/ /g, '+'), function(err, blogs) {

				if ( err ) {
					return errorHandler(err, res);
				}

				return res.json({
					result: 'success',
					archives: ArchiveFormat(blogs),
				});

			});

		}

	} else {
		return res.json({
			result: 'success',
			archives: [],
		});
	}






};

/*
	所有文章归档
*/
exports.archiveAll = function(req, res) {
	Blog.getArchives(function(err, blogs) {

		if ( err ) {
			return errorHandler(err, res);
		}

		return res.json({
			result: 'success',
			archives: ArchiveFormat(blogs),
		});

	});
};

/*
	获取开博至今年的年份
*/
exports.siteYear = function(req, res) {

	let beginYear = 2016;
	let currentYear = new Date().getFullYear();

	return res.json({
		beginYear: beginYear,
		currentYear: currentYear,
		span: currentYear - beginYear + 1,
	});

};

/*
	获取指定年份博文条数，按月份分组
*/
exports.blogCountForYear = function(req, res) {

	let year = req.body.year;

	if ( illegalYear(year) ) {
		return res.json({
			result: 'success',
			yearBlogs: getSefeYearBlog(),
		});
	}

	Blog.getYearBlog(year, function(err, blogs) {

		var yearBlogs = getSefeYearBlog();

		_.map(blogs, function(blog, index) {

			var date = new Date(blog.time.createAt);
			var month = date.getMonth() + 1;
			month = month < 10 ? '0' + month : month;

			yearBlogs[String(month)]++

		});

		return res.json({
			result: 'success',
			yearBlogs: yearBlogs,
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

/* 
	格式化归档博文 
	@param {Array} 博文数组 
		[
			 {
				blogId: '',
				title: '',
				time: '',
			 }, 
		]
	@return {Array} 格式化后的博文数组
		[
			 {
				header: '201604',
				blogs: [
					{
						blogId: '',
						title: '',
						time: '',
					 }, 
				]
			 },

		]


*/
function ArchiveFormat(blogs) {

	var _nosortResultObj = {};
	var _nosortResultArray = [];
	var _sortResultArray = [];

	/*
		获得未排序的结果对象
		{
			'201604': {
				header: '201604',
				blogs: [
					{
						blogId: '',
						title: '',
						time: '',
					 }, 
				]
			 },
		}
	*/ 
	_.map(blogs, function(blog) {

		var date = new Date(blog.time.createAt);

		// 获取月份日期
		var year = date.getFullYear(),
			month = date.getMonth() + 1;

		month = month < 10 ? '0' + month : month;

		var key = String(year) + String(month);

		// 不存在此日期key，则创建
		if( !_nosortResultObj[key] ) {
			_nosortResultObj[key] = {
				header: key,
				blogs: [],
			};
		}

		_nosortResultObj[key].blogs.push(blog);

	});

	// 把对象存成无序数组
	_.map(_nosortResultObj, function(obj) {

		_nosortResultArray.push(obj);

	});

	// 无序数组排序，时间降序
	_sortResultArray = _.sortBy(_nosortResultArray, function(item) {
		return -item.header;
	});

	_nosortResultObj = null;
	_nosortResultArray = null;

	return _sortResultArray;

};

function getSefeYearBlog() {
	return {
	  '01': 0,
	  '02': 0,
	  '03': 0,
	  '04': 0,
	  '05': 0,
	  '06': 0,
	  '07': 0,
	  '08': 0,
	  '09': 0,
	  '10': 0,
	  '11': 0,
	  '12': 0,
	};
};


function illegalYear(year) {

	year = parseInt(year, 10);

	return ( year < 2016 || year > new Date().getFullYear() )

};

function illegalMonth(month) {

	month = parseInt(month, 10);

	return ( month > 12 ||  month < 1 );

};

