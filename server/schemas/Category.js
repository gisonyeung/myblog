var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
	cateName: String,
	blogs: {
		type: Array,
		default: [],
	},
	time: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		},
	},
});

CategorySchema.pre('save', function(next) {
	if ( this.isNew ) {
		this.time.createAt = this.time.updateAt = Date.now();
	} else {
		this.time.updateAt = Date.now();
	}
	next();
});

CategorySchema.statics = {

	fetchByCateName: function(cateName, callback) {
		return this
			.findOne({ cateName: cateName })
			.exec(callback);
	},

	fetchAll: function(callback) {
		return this
			.find({})
			.sort({'time.createAt': -1})
			.exec(callback);
	},

	findLastOne: function(callback) {
		return this
			.find({})
			.sort({'time.createAt': -1})
			.limit(1)
			.exec(callback);
	},

};

module.exports = CategorySchema;