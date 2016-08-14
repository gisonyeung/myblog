var mongoose = require('mongoose');

var MemberSchema = new mongoose.Schema({
	nickname: String,
	email: String,
	createAt: {
		type: Date,
		default: Date.now(),
	},
});

MemberSchema.pre('save', function(next) {
	if ( this.isNew ) {
		this.createAt = Date.now();
	}
	next();
});

var items_per_page = 50;

MemberSchema.statics = {

	fetchMemberById: function(id, callback) {
		id = mongoose.Types.ObjectId(id);
		return this
			.findOne({
				_id: id,
			})
			.exec(callback);
	},

	fetchMember: function(email, callback) {
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

	fetchAll: function(callback) {
		return this
			.find({})
			.exec(callback);
	},


};

module.exports = MemberSchema;