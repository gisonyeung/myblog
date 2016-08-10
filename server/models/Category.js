var mongoose = require('mongoose');
var CategorySchema = require('../schemas/Category.js');

var Category = mongoose.model('Category', CategorySchema);

module.exports = Category;