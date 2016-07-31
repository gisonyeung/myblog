var mongoose = require('mongoose');
var BlogSchema = require('../schemas/Blog.js');

var Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;