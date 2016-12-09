module.exports = {
	cookieSecret: 'RT23TdR5Y3cvAasCX24',
	mail: {
		user: 'user@163.com',
		password: 'pwd',
		string: 'smtps://use%40163.com:pwd@smtp.163.com',
	},
	mongo: {
		development: 'mongodb://localhost:27017/blog',
		production: 'mongodb://localhost:27017/blog',
		session: 'mongodb://localhost:27017/session'
	},
	admin: {
		username: 'admin',
		password: 'admin',
	}
};
