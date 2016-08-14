var mongoose = require('mongoose');

var TagSchema = new mongoose.Schema({
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

TagSchema.pre('save', function(next) {
	if ( this.isNew ) {
		this.time.createAt = this.time.updateAt = Date.now();
	} else {
		this.time.updateAt = Date.now();
	}
	next();
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