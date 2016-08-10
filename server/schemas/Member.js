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

MemberSchema.statics = {

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


};

module.exports = MemberSchema;