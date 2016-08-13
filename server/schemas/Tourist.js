var mongoose = require('mongoose');

var TouristSchema = new mongoose.Schema({
	nickname: String,
	email: String,
	website: String,
	createAt: {
		type: Date,
		default: Date.now(),
	},
});

TouristSchema.pre('save', function(next) {
	if ( this.isNew ) {
		this.createAt = Date.now();
	}
	next();
});

var items_per_page = 50;

TouristSchema.statics = {

	fetchTourist: function(email, callback) {
		return this
			.findOne({
				email: email
			})
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
			.sort({'createAt': -1})
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


};

module.exports = TouristSchema;