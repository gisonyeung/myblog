var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
	cateId: Number,
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

CategorySchema.statics = {

	fetchByCateName: function(cateName, callback) {
		return this
			.findOne({ cateName: cateName })
			.exec(callback);
	},

	fetchAll: function(callback) {
		return this
			.find({})
			.exec(callback);
	},

};

module.exports = CategorySchema;