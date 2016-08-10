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







};

module.exports = CommentSchema;