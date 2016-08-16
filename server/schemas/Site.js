var mongoose = require('mongoose');

var SiteSchema = new mongoose.Schema({
	view: Number,
	time: {
		openAt: {
			type: Date,
			default: Date.now()
		},
		lastViewAt: {
			type: Date,
			default: Date.now()
		},
	},
	branch: String,
});

SiteSchema.pre('save', function(next) {
	if ( this.isNew ) {
		this.time.createAt = this.time.lastViewAt = Date.now();
	} else {
		this.time.lastViewAt = Date.now();
	}
	next();
});

SiteSchema.statics = {

	findByBranch: function(branch, callback) {
		return this
			.findOne({ branch: branch })
			.exec(callback);
	},

	
};

module.exports = SiteSchema;