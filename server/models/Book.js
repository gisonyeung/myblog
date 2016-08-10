var mongoose = require('mongoose');
var BookSchema = require('../schemas/Book.js');

var Book = mongoose.model('Book', BookSchema);

module.exports = Book;