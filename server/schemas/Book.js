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
	recommend: Number,
});

BookSchema.pre('save', function(next) {
	if ( this.isNew ) {
		this.time = Date.now();
		this.recommend = 0;
	}
	next();
});

var items_per_page = 50;

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

	findLastOne: function(callback) {
		return this
			.find({})
			.sort({'time': -1})
			.limit(1)
			.exec(callback);
	},

	fetchById: function(id, callback) {
		return this
			.findOne({
				_id: id,
			})
			.exec(callback);
	},


};

module.exports = BookSchema;