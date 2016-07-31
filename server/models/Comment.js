var mongoose = require('mongoose');
var CommentSchema = require('../schemas/Comment.js');

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;