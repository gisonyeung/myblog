var mongoose = require('mongoose');

var BlogSchema = new mongoose.Schema({
	blogId: Number,
	title: String,
	summary: String,
	content: String,
	category: String,
	tags: String,
	numbers: {
		view: Number,
		comment: Number,
		like: Number,
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
	isShow: {
		type: Boolean,
		default: true,
	}
});

BlogSchema.pre('save', function(next) {
	if ( this.isNew ) {
		this.time.createAt = this.time.updateAt = Date.now();
	} else {
		this.time.updateAt = Date.now();
	}
	next();
});

var items_per_page = 5;

BlogSchema.statics = {

	fetchAll: function(callback) {
		return this
			.find({ isShow: true }, { content: 0 })
			.sort('time.createAt')
			.exec(callback);
	},

	findByBlogId: function(blogId, callback) {
		return this
			.findOne({ blogId: blogId })
			.exec(callback);
	},

	fetchByPage: function(page, callback) {
		return this
			.find({ isShow: true }, { content: 0 })
			.sort({'time.createAt': -1})
			.skip( items_per_page * (page - 1) )
			.limit(items_per_page)
			.exec(callback);
	},

	getCount: function(callback) {
		return this
			.count({ isShow: true })
			.exec(callback);
	},

	getTitle: function(blogId, callback) {
		return this
			.findOne(
				{ blogId: blogId }, 
				{ 
				  blogId: 1,  
				  title: 1,
				}
			)
			.exec(callback);
	}
}

module.exports = BlogSchema;

