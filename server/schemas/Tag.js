var mongoose = require('mongoose');

var TagSchema = new mongoose.Schema({
	tagId: Number,
	tagName: String,
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

TagSchema.statics = {

	fetchByTagName: function(tagName, callback) {
		return this
			.findOne({ tagName: tagName })
			.exec(callback);
	},

	fetchAll: function(callback) {
		return this
			.find({})
			.exec(callback);
	},

	
};

module.exports = TagSchema;