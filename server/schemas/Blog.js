var mongoose = require('mongoose');

var BlogSchema = new mongoose.Schema({
	blogId: Number,
	title: String,
	summary: String,
	markdown: String,
	content: String,
	category: String,
	tags: String,
	numbers: {
		view: Number,
		like: Number,
		comment: Number,
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
		this.numbers.view = 0;
		this.numbers.like = 0;
		this.numbers.comment = 0;
		this.isShow = true;
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
			.findOne(
				{ 
					blogId: blogId,
					isShow: true,
				},
				{
					markdown: 0,
				}
			)
			.exec(callback);
	},

	fetchByPage: function(page, callback) {
		return this
			.find({ isShow: true }, { content: 0, markdown: 0 })
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
				{ 
					blogId: blogId,
					isShow: true,
				}, 
				{ 
				  blogId: 1,  
				  title: 1,
				}
			)
			.exec(callback);
	},

	getArchivesByBlogId: function(blogId, callback) {
		return this
			.findOne(
				{ 
					blogId: blogId,
					isShow: true,
				}, 
				{ 
				  blogId: 1,  
				  title: 1,
				  time: 1,
				}
			)
			.exec(callback);
	},

	getArchives: function(callback) {
		return this
			.find(
				{
					isShow: true,
				}, 
				{ 
				  blogId: 1,  
				  title: 1,
				  time: 1,
				}
			)
			.exec(callback);
	},

	getYearBlog: function(year, callback) {
		var nextYear = parseInt(year, 10) + 1;
		return this
			.where('time.createAt')
				.gte(new Date(year + '-01-01'))
				.lt(new Date(nextYear + '-01-01'))
			.select('blogId title time')
			.exec(callback);
	},

	getMonthBlog: function(year, month, callback) {
		var nextMonth = parseInt(month, 10) + 1;

		var nextYear = nextMonth > 12 ? parseInt(year, 10) + 1 : year;

		nextMonth = nextMonth > 12 ? 1 : nextMonth;

		nextMonth = nextMonth < 10 ? '0' + nextMonth : nextMonth;

		return this
			.where('time.createAt')
				.gte(new Date(year + '-' + month + '-01'))
				.lt(new Date(nextYear + '-' + nextMonth + '-01'))
			.select('blogId title time')
			.exec(callback);
	},

	getArchivesByFuzzy: function(keyword, callback) {

		// 替换常用分隔符
		keyword = keyword.replace(/\+|,|，|-| /g, '|');

		var reg = new RegExp(keyword, 'i');

		return this
			.find(
				{
					isShow: true,
				}, 
				{ 
				  blogId: 1,  
				  title: 1,
				  time: 1,
				}
			)
			.or([
				{
					title: { $regex: reg },
				},
				{
					tags: { $regex: reg },
				},
				{
					summary: { $regex: reg },
				},
				{
					content: { $regex: reg },
				},
			])
			.select('blogId title time')
			.exec(callback);

	},

	getCountByAdmin: function(callback) {
		return this
			.count({})
			.exec(callback);
	},

	fetchByPageAdmin: function(page, callback) {
		return this
			.find({}, { content:0, markdown: 0 })
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

	fetchByCategory: function(cateName, callback) {
		return this
			.find(
				{
					category: cateName,
				},
				{
					content: 0,
					markdown: 0,
					summary: 0,
				}
			)
			.sort({'time.createAt': -1})
			.exec(callback);
	},

	fetchCountByCategory: function(cateName, callback) {
		return this
			.count({ 
				category: cateName,
			})
			.exec(callback);
	},

	fetchByTag: function(tagName, callback) {

		var reg_tpl = '(^{{content}},)|(,{{content}}$)|(,{{content}},)|(^{{content}}$)';

		var reg = new RegExp(reg_tpl.replace(/{{content}}/g, tagName), 'g');

		return this
			.find(
				{
					tags: { $regex: reg },
				},
				{
					content: 0,
					markdown: 0,
					summary: 0,
				}
			)
			.sort({'time.createAt': -1})
			.exec(callback);
	},

	fetchCountByTag: function(tagName, callback) {

		var reg_tpl = '(^{{content}},)|(,{{content}}$)|(,{{content}},)|(^{{content}}$)';

		var reg = new RegExp(reg_tpl.replace(/{{content}}/g, tagName), 'g');

		return this
			.count({ 
				tags: { $regex: reg },
			})
			.exec(callback);
	},







	






}

module.exports = BlogSchema;

