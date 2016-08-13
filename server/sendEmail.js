var nodemailer = require('nodemailer');
var credentials = require('./credentials.js');

var mailTransport = nodemailer.createTransport(credentials.mail.string);





var mail = {

	commentNotice: commentNotice,
	commentNotice_myself: commentNotice_myself,
	replyNotice: replyNotice,
	replyNotice_myself: replyNotice_myself,
	boardNotice: boardNotice,
	boardNotice_myself: boardNotice_myself,
	cancelSub: cancelSub,
	subNotice: subNotice,
	subNotice_myself: subNotice_myself,
	newBlogNotice: newBlogNotice,
};

module.exports = mail;




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
function commentNotice(opts) {

	if( typeof(opts.to) == 'object' ) {
		opts.to = opts.to.join(', ');
	}

	mailTransport.sendMail({
		from: '"杨子聪的个人博客" <yangzicong2008@163.com>',
		to: opts.to,
		subject: '杨子聪的个人博客',
		html: getNoticeTemplate(opts.data),
	}, function(err) {
		if(err) console.log( '发送邮件失败: ' + err );
	});

};

function commentNotice_myself(opts) {
	mailTransport.sendMail({
		from: '"杨子聪的个人博客" <yangzicong2008@163.com>',
		to: '442361125@qq.com',
		subject: '个人博客有新留言',
		html: getNoticeTemplate_myself(opts.data),
	}, function(err) {
		if(err) console.log( '发送邮件失败: ' + err );
	});
};

function boardNotice(opts) {

	if( typeof(opts.to) == 'object' ) {
		opts.to = opts.to.join(', ');
	}

	mailTransport.sendMail({
		from: '"杨子聪的个人博客" <yangzicong2008@163.com>',
		to: opts.to,
		subject: '杨子聪的个人博客',
		html: getBoardTemplate(opts.data),
	}, function(err) {
		if(err) console.log( '发送邮件失败: ' + err );
	});

};

function boardNotice_myself(opts) {
	mailTransport.sendMail({
		from: '"杨子聪的个人博客" <yangzicong2008@163.com>',
		to: '442361125@qq.com',
		subject: '个人博客有新留言',
		html: getBoardTemplate_myself(opts.data),
	}, function(err) {
		if(err) console.log( '发送邮件失败: ' + err );
	});
};





function replyNotice(opts) {

	if( typeof(opts.to) == 'object' ) {
		opts.to = opts.to.join(', ');
	}

	mailTransport.sendMail({
		from: '"杨子聪的个人博客" <yangzicong2008@163.com>',
		to: opts.to,
		subject: '杨子聪的个人博客',
		html: getReplyTemplate(opts.data),
	}, function(err) {
		if(err) console.log( '发送邮件失败: ' + err );
	});

};


function replyNotice_myself(opts) {
	mailTransport.sendMail({
		from: '"杨子聪的个人博客" <yangzicong2008@163.com>',
		to: '442361125@qq.com',
		subject: '行博有新留言',
		html: getReplyTemplate_myself(opts.data),
	}, function(err) {
		if(err) console.log( '发送邮件失败: ' + err );
	});
};



function cancelSub(opts) {

	if( typeof(opts.to) == 'object' ) {
		opts.to = opts.to.join(', ');
	}

	mailTransport.sendMail({
		from: '"杨子聪的个人博客" <yangzicong2008@163.com>',
		to: opts.to,
		subject: '杨子聪的个人博客',
		html: getCancelSubTemplate(opts.data),
	}, function(err) {
		if(err) console.log( '发送邮件失败: ' + err );
	});

};


function subNotice(opts) {

	if( typeof(opts.to) == 'object' ) {
		opts.to = opts.to.join(', ');
	}

	mailTransport.sendMail({
		from: '"杨子聪的个人博客" <yangzicong2008@163.com>',
		to: opts.to,
		subject: '杨子聪的个人博客',
		html: getSubTemplate(opts.data),
	}, function(err) {
		if(err) console.log( '发送邮件失败: ' + err );
	});

};


function subNotice_myself(opts) {
	mailTransport.sendMail({
		from: '"杨子聪的个人博客" <yangzicong2008@163.com>',
		to: '442361125@qq.com',
		subject: '行博有新留言',
		html: getSubTemplate_myself(opts.data),
	}, function(err) {
		if(err) console.log( '发送邮件失败: ' + err );
	});
};


function newBlogNotice(opts) {

	if( typeof(opts.to) == 'object' ) {
		opts.to = opts.to.join(', ');
	}

	mailTransport.sendMail({
		from: '"杨子聪的个人博客" <yangzicong2008@163.com>',
		to: opts.to,
		subject: '杨子聪的个人博客',
		html: getBlogTemplate(opts.data),
	}, function(err) {
		if(err) console.log( '发送邮件失败: ' + err );
	});
};








var url_home = 'http://www.twopointhole.com';

var tpl_header = '<table class="title-box" style="border:0;padding:0;margin:0;width:100%"><tbody><tr><td style="vertical-align:top;background-color:#24292c;color:#fff;padding-top:10px;padding-bottom:10px;" width="100%"><h1 style="margin:0;padding-bottom:6px;padding-left:20px;"><a style="color:#fff;font-size:18px;font-family:Microsoft Yahei, Helvetica, sans-serif;font-weight:normal;text-decoration:none;" href="' + url_home + '" title="(' + url_home + ')" target="_blank">杨子聪的个人博客</a></h1></td></tr></tbody></table>'


/*
	{
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
	}
*/
function getNoticeTemplate(opts) {

	var tpl_comment = '<table style="border:0;padding:0;margin:0;width:100%;font-family:Microsoft Yahei, Helvetica, sans-serif;font-weight:normal;text-decoration:none;padding-left:30px;padding-right:30px;"><tbody><tr><td style="margin-bottom:0;line-height:1.4em;" width="100%"><p style="margin:1em 0 3px 0;font-family:Microsoft Yahei, Helvetica, sans-serif;font-size:16px;color:#333;">您在<a style="text-decoration:none;color:#537fd8;margin-left:5px;margin-right:5px;" href="{{url_home}}" target="_blank">杨子聪的博客</a>上的留言有新回复！</p><p style="font-size:13px;color:#555;margin:9px 0 3px 0;font-family:Microsoft Yahei, Helvetica, sans-serif;line-height:140%;font-size:13px;border-bottom:1px solid #ddd;padding-bottom: 20px;"><span>邮件发送时间: {{currentTime}}</span></p><div style="margin-top:20px;font-size:14px;"><p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">{{replyTo_nickname}}，您好！</p><p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">您于<span style="color:#999;margin-left:5px;margin-right:5px;">{{replyTo_time}}</span>在博文<a href="{{url_home}}/article/{{blog_blogId}}" target="_blank" style="text-decoration:none;color:#537fd8;margin-left:5px;margin-right:5px;">《{{blog_title}}》</a>上发表评论：</p><pre style="padding-left:15px;padding-right:15px;padding-top:20px;padding-bottom:20px;background-color:#eee;border:1px solid #ccc;font-family:Microsoft Yahei, Helvetica, sans-serif;">{{replyTo_comment}}</pre><p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">{{replyFrom_nickname}} 于<span style="color:#999;margin-left:5px;margin-right:5px;">{{replyFrom_time}}</span>回复了您的评论：</p><pre style="padding-left:15px;padding-right:15px;padding-top:20px;padding-bottom:20px;background-color:#eee;border:1px solid #ccc;font-family:Microsoft Yahei, Helvetica, sans-serif;">{{replyFrom_comment}}</pre><p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">您可以点击<a href="{{url_home}}/article/{{blog_blogId}}" target="_blank" style="text-decoration:none;color:#537fd8;margin-left:5px;margin-right:5px;">[查看详情]</a>查看回复的完整内容</p><p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">感谢您对<a href="{{url_home}}" target="_blank" style="text-decoration:none;color:#537fd8;margin-left:5px;margin-right:5px;font-family:Microsoft Yahei, Helvetica, sans-serif;">杨子聪的个人博客</a>的关注，如您有任何疑问，欢迎在博客留言，我会一一解答</p><p style="line-height:30px;color:#ff5722;font-family:Microsoft Yahei, Helvetica, sans-serif;">(此邮件由系统自动发出，请勿直接回复此邮箱)</p></div></td></tr></tbody></table>'

	return tpl_header + tpl_comment
		.replace(/{{url_home}}/g, url_home)
		.replace(/{{currentTime}}/g, opts.currentTime)
		.replace(/{{replyTo_nickname}}/g, opts.replyTo.nickname)
		.replace(/{{replyTo_time}}/g, opts.replyTo.time)
		.replace(/{{replyTo_comment}}/g, opts.replyTo.comment)
		.replace(/{{replyFrom_nickname}}/g, opts.replyFrom.nickname)
		.replace(/{{replyFrom_time}}/g, opts.replyFrom.time)
		.replace(/{{replyFrom_comment}}/g, opts.replyFrom.comment)
		.replace(/{{blog_blogId}}/g, opts.blog.blogId)
		.replace(/{{blog_title}}/g, opts.blog.title);
};
/*
	{
		currentTime: '',
		replyTo: {
			nickname: '',
			comment: '',
			time: '',
		},
		replyFrom: {},
		blog: {
			blogId: '',
			title: '',
		}
	}
*/
function getNoticeTemplate_myself(opts) {

	var tpl_comment_myself = '<table style="border:0;padding:0;margin:0;width:100%;font-family:Microsoft Yahei, Helvetica, sans-serif;font-weight:normal;text-decoration:none;padding-left:30px;padding-right:30px;"><tbody><tr><td style="margin-bottom:0;line-height:1.4em;" width="100%"><p style="margin:1em 0 3px 0;font-family:Microsoft Yahei, Helvetica, sans-serif;font-size:16px;color:#333;">博客有新留言！</p><p style="font-size:13px;color:#555;margin:9px 0 3px 0;font-family:Microsoft Yahei, Helvetica, sans-serif;line-height:140%;font-size:13px;border-bottom:1px solid #ddd;padding-bottom: 20px;"><span>邮件发送时间: {{currentTime}}</span></p><div style="margin-top:20px;font-size:14px;"><p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">{{replyFrom_nickname}} 于<span style="color:#999;margin-left:5px;margin-right:5px;">{{replyFrom_time}}</span>评论了您的博文<a href="{{url_home}}/article/{{blog_blogId}}" target="_blank" style="text-decoration:none;color:#537fd8;margin-left:5px;margin-right:5px;">《{{blog_title}}》</a>：</p><pre style="padding-left:15px;padding-right:15px;padding-top:20px;padding-bottom:20px;background-color:#eee;border:1px solid #ccc;font-family:Microsoft Yahei, Helvetica, sans-serif;">{{replyFrom_comment}}</pre><p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">点击<a href="{{url_home}}/article/{{blog_blogId}}" target="_blank" style="text-decoration:none;color:#537fd8;margin-left:5px;margin-right:5px;">[查看详情]</a>查看评论的完整内容</p><p style="line-height:30px;color:#ff5722;font-family:Microsoft Yahei, Helvetica, sans-serif;">(此邮件由系统自动发出，请勿直接回复此邮箱)</p></div></td></tr></tbody></table>'

	return tpl_header + tpl_comment_myself
		.replace(/{{url_home}}/g, url_home)
		.replace(/{{currentTime}}/g, opts.currentTime)
		.replace(/{{replyFrom_nickname}}/g, opts.replyFrom.nickname)
		.replace(/{{replyFrom_time}}/g, opts.replyFrom.time)
		.replace(/{{replyFrom_comment}}/g, opts.replyFrom.comment)
		.replace(/{{blog_blogId}}/g, opts.blog.blogId)
		.replace(/{{blog_title}}/g, opts.blog.title);
};


function getBoardTemplate(opts) {

	var tpl_comment = '<table style="border:0;padding:0;margin:0;width:100%;font-family:Microsoft Yahei, Helvetica, sans-serif;font-weight:normal;text-decoration:none;padding-left:30px;padding-right:30px;"><tbody><tr><td style="margin-bottom:0;line-height:1.4em;" width="100%"><p style="margin:1em 0 3px 0;font-family:Microsoft Yahei, Helvetica, sans-serif;font-size:16px;color:#333;">您在<a style="text-decoration:none;color:#537fd8;margin-left:5px;margin-right:5px;" href="{{url_home}}" target="_blank">杨子聪的博客</a>上的留言有新回复！</p><p style="font-size:13px;color:#555;margin:9px 0 3px 0;font-family:Microsoft Yahei, Helvetica, sans-serif;line-height:140%;font-size:13px;border-bottom:1px solid #ddd;padding-bottom: 20px;"><span>邮件发送时间: {{currentTime}}</span></p><div style="margin-top:20px;font-size:14px;"><p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">{{replyTo_nickname}}，您好！</p><p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">您于<span style="color:#999;margin-left:5px;margin-right:5px;">{{replyTo_time}}</span>在我的<a href="{{url_home}}/board" target="_blank" style="text-decoration:none;color:#537fd8;margin-left:5px;margin-right:5px;">留言板</a>上发表留言：</p><pre style="padding-left:15px;padding-right:15px;padding-top:20px;padding-bottom:20px;background-color:#eee;border:1px solid #ccc;font-family:Microsoft Yahei, Helvetica, sans-serif;">{{replyTo_comment}}</pre><p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">{{replyFrom_nickname}} 于<span style="color:#999;margin-left:5px;margin-right:5px;">{{replyFrom_time}}</span>回复了您的留言：</p><pre style="padding-left:15px;padding-right:15px;padding-top:20px;padding-bottom:20px;background-color:#eee;border:1px solid #ccc;font-family:Microsoft Yahei, Helvetica, sans-serif;">{{replyFrom_comment}}</pre><p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">您可以点击<a href="{{url_home}}/board" target="_blank" style="text-decoration:none;color:#537fd8;margin-left:5px;margin-right:5px;">[查看详情]</a>查看回复的完整内容</p><p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">感谢您对<a href="{{url_home}}" target="_blank" style="text-decoration:none;color:#537fd8;margin-left:5px;margin-right:5px;font-family:Microsoft Yahei, Helvetica, sans-serif;">杨子聪的个人博客</a>的关注，如您有任何疑问，欢迎在博客留言，我会一一解答</p><p style="line-height:30px;color:#ff5722;font-family:Microsoft Yahei, Helvetica, sans-serif;">(此邮件由系统自动发出，请勿直接回复此邮箱)</p></div></td></tr></tbody></table>'

	return tpl_header + tpl_comment
		.replace(/{{url_home}}/g, url_home)
		.replace(/{{currentTime}}/g, opts.currentTime)
		.replace(/{{replyTo_nickname}}/g, opts.replyTo.nickname)
		.replace(/{{replyTo_time}}/g, opts.replyTo.time)
		.replace(/{{replyTo_comment}}/g, opts.replyTo.comment)
		.replace(/{{replyFrom_nickname}}/g, opts.replyFrom.nickname)
		.replace(/{{replyFrom_time}}/g, opts.replyFrom.time)
		.replace(/{{replyFrom_comment}}/g, opts.replyFrom.comment);
}
/*
	{
		currentTime: '',
		replyTo: {
			nickname: '',
			comment: '',
			time: '',
		},
		replyFrom: {},
		blog: {
			blogId: '',
			title: '',
		}
	}
*/
function getBoardTemplate_myself(opts) {

	var tpl_comment_myself = '<table style="border:0;padding:0;margin:0;width:100%;font-family:Microsoft Yahei, Helvetica, sans-serif;font-weight:normal;text-decoration:none;padding-left:30px;padding-right:30px;"><tbody><tr><td style="margin-bottom:0;line-height:1.4em;" width="100%"><p style="margin:1em 0 3px 0;font-family:Microsoft Yahei, Helvetica, sans-serif;font-size:16px;color:#333;">博客有新留言！</p><p style="font-size:13px;color:#555;margin:9px 0 3px 0;font-family:Microsoft Yahei, Helvetica, sans-serif;line-height:140%;font-size:13px;border-bottom:1px solid #ddd;padding-bottom: 20px;"><span>邮件发送时间: {{currentTime}}</span></p><div style="margin-top:20px;font-size:14px;"><p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">{{replyFrom_nickname}} 于<span style="color:#999;margin-left:5px;margin-right:5px;">{{replyFrom_time}}</span>在您的<a href="{{url_home}}/board" target="_blank" style="text-decoration:none;color:#537fd8;margin-left:5px;margin-right:5px;">留言板</a>上发布了留言：</p><pre style="padding-left:15px;padding-right:15px;padding-top:20px;padding-bottom:20px;background-color:#eee;border:1px solid #ccc;font-family:Microsoft Yahei, Helvetica, sans-serif;">{{replyFrom_comment}}</pre><p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">点击<a href="{{url_home}}/board" target="_blank" style="text-decoration:none;color:#537fd8;margin-left:5px;margin-right:5px;">[查看详情]</a>查看留言的完整内容</p><p style="line-height:30px;color:#ff5722;font-family:Microsoft Yahei, Helvetica, sans-serif;">(此邮件由系统自动发出，请勿直接回复此邮箱)</p></div></td></tr></tbody></table>'

	return tpl_header + tpl_comment_myself
		.replace(/{{url_home}}/g, url_home)
		.replace(/{{currentTime}}/g, opts.currentTime)
		.replace(/{{replyFrom_nickname}}/g, opts.replyFrom.nickname)
		.replace(/{{replyFrom_time}}/g, opts.replyFrom.time)
		.replace(/{{replyFrom_comment}}/g, opts.replyFrom.comment);
};




function getReplyTemplate(opts) {

	var tpl_comment = '<table style="border:0;padding:0;margin:0;width:100%;font-family:Microsoft Yahei, Helvetica, sans-serif;font-weight:normal;text-decoration:none;padding-left:30px;padding-right:30px;"><tbody><tr><td style="margin-bottom:0;line-height:1.4em;" width="100%"><p style="margin:1em 0 3px 0;font-family:Microsoft Yahei, Helvetica, sans-serif;font-size:16px;color:#333;">您在<a style="text-decoration:none;color:#537fd8;margin-left:5px;margin-right:5px;" href="{{url_home}}" target="_blank">杨子聪的博客</a>上的留言有新回复！</p><p style="font-size:13px;color:#555;margin:9px 0 3px 0;font-family:Microsoft Yahei, Helvetica, sans-serif;line-height:140%;font-size:13px;border-bottom:1px solid #ddd;padding-bottom: 20px;"><span>邮件发送时间: {{currentTime}}</span></p><div style="margin-top:20px;font-size:14px;"><p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">{{replyTo_nickname}}，您好！</p><p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">您于<span style="color:#999;margin-left:5px;margin-right:5px;">{{replyTo_time}}</span>在我的日常动态上发表评论：</p><pre style="padding-left:15px;padding-right:15px;padding-top:20px;padding-bottom:20px;background-color:#eee;border:1px solid #ccc;font-family:Microsoft Yahei, Helvetica, sans-serif;">{{replyTo_comment}}</pre><p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">{{replyFrom_nickname}} 于<span style="color:#999;margin-left:5px;margin-right:5px;">{{replyFrom_time}}</span>回复了您的评论：</p><pre style="padding-left:15px;padding-right:15px;padding-top:20px;padding-bottom:20px;background-color:#eee;border:1px solid #ccc;font-family:Microsoft Yahei, Helvetica, sans-serif;">{{replyFrom_comment}}</pre><p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">行博内容：</p><pre style="padding-left:15px;padding-right:15px;padding-top:20px;padding-bottom:20px;background-color:#eee;border:1px solid #ccc;font-family:Microsoft Yahei, Helvetica, sans-serif;">{{blog_content}}</pre><p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">您可以点击<a href="{{url_home}}/mylife/{{blog_blogId}}" target="_blank" style="text-decoration:none;color:#537fd8;margin-left:5px;margin-right:5px;">[查看详情]</a>查看回复的完整内容</p><p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">感谢您对<a href="{{url_home}}" target="_blank" style="text-decoration:none;color:#537fd8;margin-left:5px;margin-right:5px;font-family:Microsoft Yahei, Helvetica, sans-serif;">杨子聪的个人博客</a>的关注，如您有任何疑问，欢迎在博客留言，我会一一解答</p><p style="line-height:30px;color:#ff5722;font-family:Microsoft Yahei, Helvetica, sans-serif;">(此邮件由系统自动发出，请勿直接回复此邮箱)</p></div></td></tr></tbody></table>'

	return tpl_header + tpl_comment
		.replace(/{{url_home}}/g, url_home)
		.replace(/{{currentTime}}/g, opts.currentTime)
		.replace(/{{replyTo_nickname}}/g, opts.replyTo.nickname)
		.replace(/{{replyTo_time}}/g, opts.replyTo.time)
		.replace(/{{replyTo_comment}}/g, opts.replyTo.comment)
		.replace(/{{replyFrom_nickname}}/g, opts.replyFrom.nickname)
		.replace(/{{replyFrom_time}}/g, opts.replyFrom.time)
		.replace(/{{replyFrom_comment}}/g, opts.replyFrom.comment)
		.replace(/{{blog_blogId}}/g, opts.blog.blogId)
		.replace(/{{blog_content}}/g, opts.blog.content);
};

function getBlogTemplate(opts) {

	var tpl_comment = '<table style="border:0;padding:0;margin:0;width:100%;font-family:Microsoft Yahei, Helvetica, sans-serif;font-weight:normal;text-decoration:none;padding-left:30px;padding-right:30px;"><tbody><tr><td style="margin-bottom:0;line-height:1.4em;" width="100%"><p style="margin:1em 0 3px 0;font-family:Microsoft Yahei, Helvetica, sans-serif;font-size:16px;color:#333;">[新博文]<a style="text-decoration:none;color:#537fd8;margin-left:5px;margin-right:5px;" href="{{url_home}}/article/{{blog_blogId}}" target="_blank">{{blog_title}}</a></p><p style="font-size:13px;color:#555;margin:9px 0 3px 0;font-family:Microsoft Yahei, Helvetica, sans-serif;line-height:140%;font-size:13px;border-bottom:1px solid #ddd;padding-bottom: 20px;"><span>邮件发送时间: {{currentTime}}</span></p><div style="margin-top:20px;font-size:14px;"><p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">{{replyTo_nickname}}，您好！</p><p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">我于<span style="color:#999;margin-left:5px;margin-right:5px;">{{currentTime}}</span>发表了新博文<a href="{{url_home}}/article/{{blog_blogId}}" target="_blank" style="text-decoration:none;color:#537fd8;margin-left:5px;margin-right:5px;">《{{blog_tilte}}》</a>：</p><pre style="padding-left:15px;padding-right:15px;padding-top:20px;padding-bottom:20px;background-color:#eee;border:1px solid #ccc;font-family:Microsoft Yahei, Helvetica, sans-serif;">{{blog_summation}}</pre><p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">您可以点击<a href="{{url_home}}/article/{{blog_blogId}}" target="_blank" style="text-decoration:none;color:#537fd8;margin-left:5px;margin-right:5px;">[查看详情]</a>查看文章的完整内容</p><p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">感谢您对<a href="{{url_home}}" target="_blank" style="text-decoration:none;color:#537fd8;margin-left:5px;margin-right:5px;font-family:Microsoft Yahei, Helvetica, sans-serif;">杨子聪的个人博客</a>的关注，如您有任何疑问，欢迎在博客留言，我会一一解答</p><p style="line-height:30px;color:#ff5722;font-family:Microsoft Yahei, Helvetica, sans-serif;">(此邮件由系统自动发出，请勿直接回复此邮箱)</p></div></td></tr></tbody></table>'

	return tpl_header + tpl_comment
		.replace(/{{url_home}}/g, url_home)
		.replace(/{{currentTime}}/g, opts.currentTime)
		.replace(/{{replyTo_nickname}}/g, opts.replyTo.nickname)
		.replace(/{{blog_blogId}}/g, opts.blog.blogId)
		.replace(/{{blog_summation}}/g, opts.blog.summation);
};





function getReplyTemplate_myself(opts) {

	var tpl_comment_myself = '<table style="border:0;padding:0;margin:0;width:100%;font-family:Microsoft Yahei, Helvetica, sans-serif;font-weight:normal;text-decoration:none;padding-left:30px;padding-right:30px;"><tbody><tr><td style="margin-bottom:0;line-height:1.4em;" width="100%"><p style="margin:1em 0 3px 0;font-family:Microsoft Yahei, Helvetica, sans-serif;font-size:16px;color:#333;">行博有新留言！</p><p style="font-size:13px;color:#555;margin:9px 0 3px 0;font-family:Microsoft Yahei, Helvetica, sans-serif;line-height:140%;font-size:13px;border-bottom:1px solid #ddd;padding-bottom: 20px;"><span>邮件发送时间: {{currentTime}}</span></p><div style="margin-top:20px;font-size:14px;"><p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">{{replyFrom_nickname}} 于<span style="color:#999;margin-left:5px;margin-right:5px;">{{replyFrom_time}}</span>评论了您的行博：</p><pre style="padding-left:15px;padding-right:15px;padding-top:20px;padding-bottom:20px;background-color:#eee;border:1px solid #ccc;font-family:Microsoft Yahei, Helvetica, sans-serif;">{{replyFrom_comment}}</pre><p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">行博内容：</p><pre style="padding-left:15px;padding-right:15px;padding-top:20px;padding-bottom:20px;background-color:#eee;border:1px solid #ccc;font-family:Microsoft Yahei, Helvetica, sans-serif;">{{blog_content}}</pre><p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">点击<a href="{{url_home}}/mylife/{{blog_blogId}}" target="_blank" style="text-decoration:none;color:#537fd8;margin-left:5px;margin-right:5px;">[查看详情]</a>查看评论的完整内容</p><p style="line-height:30px;color:#ff5722;font-family:Microsoft Yahei, Helvetica, sans-serif;">(此邮件由系统自动发出，请勿直接回复此邮箱)</p></div></td></tr></tbody></table>'

	return tpl_header + tpl_comment_myself
		.replace(/{{url_home}}/g, url_home)
		.replace(/{{currentTime}}/g, opts.currentTime)
		.replace(/{{replyFrom_nickname}}/g, opts.replyFrom.nickname)
		.replace(/{{replyFrom_time}}/g, opts.replyFrom.time)
		.replace(/{{replyFrom_comment}}/g, opts.replyFrom.comment)
		.replace(/{{blog_blogId}}/g, opts.blog.blogId)
		.replace(/{{blog_content}}/g, opts.blog.content);
};


function getCancelSubTemplate(opts) {

	var tpl_comment = '<table style="border:0;padding:0;margin:0;width:100%;font-family:Microsoft Yahei, Helvetica, sans-serif;font-weight:normal;text-decoration:none;padding-left:30px;padding-right:30px;"><tbody><tr><td style="margin-bottom:0;line-height:1.4em;" width="100%"><p style="margin:1em 0 3px 0;font-family:Microsoft Yahei, Helvetica, sans-serif;font-size:16px;color:#333;">您正在<a style="text-decoration:none;color:#537fd8;margin-left:5px;margin-right:5px;" href="{{url_home}}" target="_blank">杨子聪的博客</a>进行邮箱通知退订服务！</p><p style="font-size:13px;color:#555;margin:9px 0 3px 0;font-family:Microsoft Yahei, Helvetica, sans-serif;line-height:140%;font-size:13px;border-bottom:1px solid #ddd;padding-bottom: 20px;"><span>邮件发送时间: {{currentTime}}</span></p><div style="margin-top:20px;font-size:14px;"><p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">{{member_nickname}}，您好！</p><p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">您于<span style="color:#999;margin-left:5px;margin-right:5px;">{{currentTime}}</span>进行退订操作，退订验证码为：</p><pre style="padding-left:15px;padding-right:15px;padding-top:20px;padding-bottom:20px;background-color:#eee;border:1px solid #ccc;font-family:Microsoft Yahei, Helvetica, sans-serif;">{{member_id}}</pre><p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">感谢您对<a href="{{url_home}}" target="_blank" style="text-decoration:none;color:#537fd8;margin-left:5px;margin-right:5px;font-family:Microsoft Yahei, Helvetica, sans-serif;">杨子聪的个人博客</a>的关注，如您有任何疑问，欢迎在博客留言，我会一一解答</p><p style="line-height:30px;color:#ff5722;font-family:Microsoft Yahei, Helvetica, sans-serif;">(此邮件由系统自动发出，请勿直接回复此邮箱)</p></div></td></tr></tbody></table>'

	return tpl_header + tpl_comment
		.replace(/{{url_home}}/g, url_home)
		.replace(/{{currentTime}}/g, opts.currentTime)
		.replace(/{{member_nickname}}/g, opts.member.nickname)
		.replace(/{{member_id}}/g, opts.member._id);
};



function getSubTemplate(opts) {

	var tpl_comment = '<table style="border:0;padding:0;margin:0;width:100%;font-family:Microsoft Yahei, Helvetica, sans-serif;font-weight:normal;text-decoration:none;padding-left:30px;padding-right:30px;"><tbody><tr><td style="margin-bottom:0;line-height:1.4em;" width="100%"><p style="margin:1em 0 3px 0;font-family:Microsoft Yahei, Helvetica, sans-serif;font-size:16px;color:#333;">邮件通知服务订阅成功！</p><p style="font-size:13px;color:#555;margin:9px 0 3px 0;font-family:Microsoft Yahei, Helvetica, sans-serif;line-height:140%;font-size:13px;border-bottom:1px solid #ddd;padding-bottom: 20px;"><span>邮件发送时间: {{currentTime}}</span></p><div style="margin-top:20px;font-size:14px;"><p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">{{nickname}}，您好！</p><p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">您于<span style="color:#999;margin-left:5px;margin-right:5px;">{{currentTime}}</span>订阅了我，当有新博文发布时，系统将会第一时间以邮件形式通知您。</p><p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">感谢您的订阅！<p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">如在将来希望退订服务，可以点击<a href="{{url_home}}/unsubscribe" target="_blank" style="text-decoration:none;color:#537fd8;margin-left:5px;margin-right:5px;">退订</a>进行退订操作</p><p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">感谢您对<a href="{{url_home}}" target="_blank" style="text-decoration:none;color:#537fd8;margin-left:5px;margin-right:5px;font-family:Microsoft Yahei, Helvetica, sans-serif;">杨子聪的个人博客</a>的关注，如您有任何疑问，欢迎在博客留言，我会一一解答</p><p style="line-height:30px;color:#ff5722;font-family:Microsoft Yahei, Helvetica, sans-serif;">(此邮件由系统自动发出，请勿直接回复此邮箱)</p></div></td></tr></tbody></table>'

	return tpl_header + tpl_comment
		.replace(/{{url_home}}/g, url_home)
		.replace(/{{currentTime}}/g, opts.currentTime)
		.replace(/{{nickname}}/g, opts.nickname);
};





function getSubTemplate_myself(opts) {

	var tpl_comment_myself = '<table style="border:0;padding:0;margin:0;width:100%;font-family:Microsoft Yahei, Helvetica, sans-serif;font-weight:normal;text-decoration:none;padding-left:30px;padding-right:30px;"><tbody><tr><td style="margin-bottom:0;line-height:1.4em;" width="100%"><p style="margin:1em 0 3px 0;font-family:Microsoft Yahei, Helvetica, sans-serif;font-size:16px;color:#333;">博客有新订阅！</p><p style="font-size:13px;color:#555;margin:9px 0 3px 0;font-family:Microsoft Yahei, Helvetica, sans-serif;line-height:140%;font-size:13px;border-bottom:1px solid #ddd;padding-bottom: 20px;"><span>邮件发送时间: {{currentTime}}</span></p><div style="margin-top:20px;font-size:14px;"><p style="line-height:30px;color:#333;margin:0;font-family:Microsoft Yahei, Helvetica, sans-serif;">{{nickname}} {{email}} 于<span style="color:#999;margin-left:5px;margin-right:5px;">{{currentTime}}</span>订阅了你。</p><p style="line-height:30px;color:#ff5722;font-family:Microsoft Yahei, Helvetica, sans-serif;">(此邮件由系统自动发出，请勿直接回复此邮箱)</p></div></td></tr></tbody></table>'

	return tpl_header + tpl_comment_myself
		.replace(/{{url_home}}/g, url_home)
		.replace(/{{currentTime}}/g, opts.currentTime)
		.replace(/{{nickname}}/g, opts.nickname)
		.replace(/{{email}}/g, opts.email)
};
