module.exports = {
	cookieSecret: 'RT23TdR5Y3cvAasCX24X',
	mail: {
		user: 'yangzicong2008@163.com',
		password: 'pwd',
		string: 'smtps://yangzicong2008%40163.com:pwd@smtp.163.com',
	},
	mongo: {
		development: 'mongodb+srv://gisonyeung:mongo@gisonyeung-xjucz.mongodb.net/blog?retryWrites=true&w=majority',
		production: 'mongodb://localhost:27017/blog',
		session: 'mongodb+srv://gisonyeung:mongo@gisonyeung-xjucz.mongodb.net/session?retryWrites=true&w=majority'
	},
	admin: {
		username: 'admin',
		password: 'admin',
	}
};
