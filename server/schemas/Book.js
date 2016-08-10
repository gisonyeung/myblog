var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
	bookId: Number,
	name: String,
	photo: String,
	description: String,
	time: {
		type: Date,
		default: Date.now(),
	},
	recommend: {
		type: Number,
		default: 0,
	},
});

BookSchema.statics = {

	fetchAllBooks: function(callback) {
		return this
			.find({})
			.sort({ 'time': -1 })
			.exec(callback);
	},

	findByBookId: function(bookId, callback) {
		return this
			.findOne({ bookId: bookId })
			.exec(callback);
	},


};

module.exports = BookSchema;