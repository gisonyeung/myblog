var mongoose = require('mongoose');
var SiteSchema = require('../schemas/Site.js');

var Site = mongoose.model('Site', SiteSchema);

module.exports = Site;