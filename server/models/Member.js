var mongoose = require('mongoose');
var MemberSchema = require('../schemas/Member.js');

var Member = mongoose.model('Member', MemberSchema);

module.exports = Member;