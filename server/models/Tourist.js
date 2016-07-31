var mongoose = require('mongoose');
var TouristSchema = require('../schemas/Tourist.js');

var Tourist = mongoose.model('Tourist', TouristSchema);

module.exports = Tourist;