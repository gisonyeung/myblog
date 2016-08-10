var mongoose = require('mongoose');
var TagSchema = require('../schemas/Tag.js');

var Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;