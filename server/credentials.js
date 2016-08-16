module.exports = {
	cookieSecret: 'someString', // cookie密钥，随便设点什么字符串就行
	mail: {
		user: 'xxx@163.com', // 这里填的是邮箱名，确保开了SMTP服务
		password: 'xxx', // 邮箱密码
		string: 'smtps://username%40163.com:password@smtp.163.com', // username%40xx.com => yangzicong2008%40163.com 这相当于username，只是把@转义为%40
	},
	mongo: {
		development: 'mongodb://localhost:27017/blog', // 这里是数据库连接，确保运行了mongodb服务
		production: 'mongodb://localhost:27017/blog', // 这里是数据库连接
		session: 'mongodb://localhost:27017/session' // 这里是session数据库连接
	},
	admin: { // 这是后台管理系统登陆时的帐号密码
		username: 'admin', 
		password: '123456', 
	}
};
