var mongoose = require('mongoose');

var TouristSchema = new mongoose.Schema({
	name: String,
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

TouristSchema.statics = {

	fetchTourist: function(email, callback) {
		return this
			.findOne({
				email: email
			})
			.exec(callback);
	},


};

module.exports = TouristSchema;