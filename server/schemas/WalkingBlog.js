var mongoose = require('mongoose');

var WalkingBlogSchema = new mongoose.Schema({
	blogId: Number,
	content: String,
	photo: String,
	tags: String,
	numbers: {
		view: 0,
		comment: 0,
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

WalkingBlogSchema.pre('save', function(next) {
	if ( this.isNew ) {
		this.time.createAt = this.time.updateAt = Date.now();
		this.numbers.view = 0;
		this.numbers.comment = 0;
		this.isShow = true;
	} else {
		this.time.updateAt = Date.now();
	}
	next();
});

var items_per_time = 10;
var items_per_page = 50;

WalkingBlogSchema.statics = {

	fetchAll: function(callback) {
		return this
			.find({ isShow: true })
			.sort({'time.createAt': -1})
			.exec(callback);
	},

	fetchByIndex: function(index, callback) {
		return this
			.find({ isShow: true })
			.sort({'time.createAt': -1})
			.skip(index - 1)
			.limit(items_per_time)
			.exec(callback);
	},

	findByBlogId: function(blogId, callback) {
		return this
			.findOne(
				{ 
					blogId: blogId,
					isShow: true,
				}
			)
			.exec(callback);
	},

	getCount: function(callback) {
		return this
			.count({ isShow: true })
			.exec(callback);
	},

	getPrevId: function(blogId, callback) {
		return this
			.find({ isShow: true })
			.where('blogId').gt(blogId)
			.sort({'time.createAt': 1})
			.limit(1)
			.exec(callback);
	},

	getNextId: function(blogId, callback) {
		return this
			.find({ isShow: true })
			.where('blogId').lt(blogId)
			.sort({'time.createAt': -1})
			.limit(1)
			.exec(callback);
	},

	getCountByAdmin: function(callback) {
		return this
			.count({})
			.exec(callback);
	},

	fetchByPage: function(page, callback) {
		return this
			.find({})
			.sort({'time.createAt': -1})
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
			.sort({'time.createAt': -1})
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

	fetchByBlogId: function(id, callback) {
		return this
			.findOne({
				blogId: id,
			})
			.exec(callback);
	},





}

module.exports = WalkingBlogSchema;

