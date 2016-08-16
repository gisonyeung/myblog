var mongoose = require('mongoose');
var _ = require('lodash');

/* 数据表 */
var Blog = require('../models/Blog.js');
var Comment = require('../models/Comment.js');
var Member = require('../models/Member.js');
var Site = require('../models/Site.js');

/* 邮件 */
var mail = require('../sendEmail.js');

/* 日期格式化 */
var dateFormat = require('../utils/dateFormat.js');

/*
	订阅博客
*/
exports.subscribe = function(req, res) {

	var formData = {
		nickname: req.body.nickname,
		email: req.body.email,
	};

	/* 表单验证 */
	if ( !/\S/.test(formData.nickname) ) {
		return res.json({
			result: 'error',
			text: '昵称不能为空',
		});
	} else if ( !/\S/.test(formData.email) ) {
		return res.json({
			result: 'error',
			reason: '邮箱不能为空',
		});
	} else if ( formData.nickname.length > 20 ) {
		return res.json({
			result: 'error',
			reason: '昵称过长',
		});
	} else if ( !/^\w+@\w+\.\w+(\.\w+)?$/.test(formData.email) ) {
		return res.json({
			result: 'error',
			reason: '电子邮箱格式错误',
		});
	} else if ( formData.email.length > 50 ) {
		return res.json({
			result: 'error',
			reason: '邮箱过长',
		});
	}

	/* 查询有无此成员 */
	Member.fetchMember(formData.email, function(err, member) {

		if ( err ) {
			return errorHandler(err, res);
		}

		// 新成员，存储进数据库
		if ( _.isEmpty(member) ) {

			new Member({
				nickname: formData.nickname,
				email: formData.email,
			}).save(function(err) {

				if ( err ) {
					return errorHandler(err, res);
				}

				var opts = {
					to: formData.email,
					data: {
						currentTime: dateFormat(Date.now(), 'YYYY-MM-DD hh:mm:ss'),
						email: formData.email,
						nickname: formData.nickname,

					}
				}

				mail.subNotice(opts);
				mail.subNotice_myself(opts);

				return res.json({
					result: 'success',
					reason: '订阅成功，感谢您的订阅',
				});

			});

		} else { // 旧成员，更新名字

			member.nickname = formData.nickname;

			member.save(function(err) {

				if ( err ) {
					return res.json({
						result: 'error',
						reason: '当前邮箱此前已订阅过服务，但昵称更新失败，请重试',
					});
				}

				return res.json({
					result: 'success',
					reason: '当前邮箱此前已订阅过服务，昵称更新成功'
				});

			});

		}

	});

};

/*
	请求站点数据
*/
exports.siteNum = function(req, res) {

	// 博文数
	var blogPromise = new Promise(function(resolve, reject) {

		Blog.getCount(function(err, count) {

			if ( err ) {
				reject(0);
				return false;
			}

			resolve(count);

		});

	});

	// 留言数
	var commentPromise = new Promise(function(resolve, reject) {

		Comment.getCount(function(err, count) {

			if ( err ) {
				reject(0);
				return false;
			}

			resolve(count);

		});

	});

	// 订阅数
	var subPromise = new Promise(function(resolve, reject) {

		Member.getCount(function(err, count) {

			if ( err ) {
				reject(0);
				return false;
			}

			resolve(count);

		});

	});

	Promise.all([blogPromise, commentPromise, subPromise])
		.then(numbers => res.json({
				result: 'success',
				numbers: numbers,
			})
		)
		.catch(err => errorHandler(err, res));

};


/*
	发送退订验证邮件
*/
exports.unsubconfirm = function(req, res) {

	var email = req.body.email;

	Member.fetchMember(email, function(err, member) {

		if (err) {
			return errorHandler(err, res);
		}

		if ( _.isEmpty(member) ) {

			return res.json({
				result: 'error',
				reason: '此邮箱没有订阅服务',
			});

		};

		/*
			{
				to: 'xx@qq.com',
				data: {
					currentTime: '',
					member: {
						
					}
				},
			}
		*/
		var opts = {
			to: email,
			data: {
				currentTime: dateFormat(Date.now(), 'YYYY-MM-DD hh:mm:ss'),
				member: member,
			}
		};

		mail.cancelSub(opts);

		return res.json({
			result: 'success',
			reason: '',
		});

	});

};


/*
	退订
*/
exports.cancelSub = function(req, res) {

	var email = req.body.email;
	var id = req.body.id;

	Member.fetchMemberById(id, function(err, member) {

		if (err) {
			return errorHandler(err, res);
		}

		if ( _.isEmpty(member) ) {

			return res.json({
				result: 'error',
				reason: '退订失败，验证码无效',
			});

		};

		if ( member.email == email ) {
			
			member.remove(function(err) {

				if (err) {
					return errorHandler(err, res);
				}

				return res.json({
					result: 'success',
					reason: '退订成功，感谢您的支持',
				});

			});

		} else {

			return res.json({
				result: 'error',
				reason: '退订失败，验证码与邮箱不符',
			});

		}

	});


};


// 运行服务器时，判断站点表有无数据，无则新建一个
var branchName = 'master';
Site.findByBranch(branchName, function(err, siteData) {

	if ( !siteData ) {

		new Site({
			view: 0,
			branch: branchName,
		}).save();

	} else {
		console.log('站点访问量：' + siteData.view);
	}

});


/*
	增加站点访问量
*/
exports.addSiteView = function() {

	Site.findByBranch(branchName, function(err, siteData) {

		if ( err ) {
			console.log('site.js: 访问站点数据失败')
			return false;
		}

		if ( !siteData ) {
			console.log('site.js: 找不到对应的站点数据')
			return false;
		}

		siteData.view++;

		siteData.save(function(err) {

			if ( err ) {
				console.log('site.js：站点数据存储失败');
				return false;
			}

			console.log('站点访问+1，现访问量：' + siteData.view);
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