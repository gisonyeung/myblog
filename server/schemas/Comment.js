var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	host: Number,
	type: String, //'blog' || 'wb' || 'board'
	user: {
		nickname: String,
		email: String,
		website: String,
	},
	time: {
		type: Date,
		default: Date.now(),
	},
	content: String,
	replyTo: {
		nickname: String,
		email: String,
		website: String,
	}
});

var items_per_page = 50;

CommentSchema.statics = {

	fetchBlogComment: function(blogId, callback) {
		return this
			.find({
				host: blogId,
				type: 'blog',
			})
			.sort({
				'time': -1,
			})
			.exec(callback);
	},

	fetchWalkingBlogComment: function(blogId, callback) {
		return this
			.find({
				host: blogId,
				type: 'wb',
			})
			.sort({
				'time': -1,
			})
			.exec(callback);
	},

	fetchWalkingBlogCommentCount: function(blogId, callback) {
		return this
			.count({
				host: blogId,
				type: 'wb',
			})
			.exec(callback);
	},



	fetchBoardComment: function(callback) {
		return this
			.find({
				type: 'board',
			})
			.sort({
				'time': -1,
			})
			.exec(callback);
	},

	getCount: function(callback) {
		return this
			.count({})
			.exec(callback);
	},

	fetchByPage: function(page, callback) {
		return this
			.find({})
			.sort({'time': -1})
			.skip( items_per_page * (page - 1) )
			.limit(items_per_page)
			.exec(callback);
	},

	delete: function(id, callback) {
		return this
			.findOneAndRemove({
				_id: id,
			})
			.exec(callback);
	},

	fetchByTourist: function(email, callback) {
		return this
			.find({
				'user.email': email,
			})
			.sort({'time': -1})
			.exec(callback)
	},

	fetchByArticle: function(type, id, callback) {
		return this
			.find({
				host: id,
				type: type,
			})
			.exec(callback);
	},









};

module.exports = CommentSchema;