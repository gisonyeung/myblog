var mongoose = require('mongoose');

var TouristSchema = new mongoose.Schema({
	name: String,
	email: String,
	website: String,
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