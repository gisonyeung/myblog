var mongoose = require('mongoose');
var WalkingBlogSchema = require('../schemas/WalkingBlog.js');

var WalkingBlog = mongoose.model('WalkingBlog', WalkingBlogSchema);

module.exports = WalkingBlog;