module.exports = function(req, formData) {

	var cookies = req.cookies;
	var nickname;
	var email;
	// var website;

	if (formData) {
		nickname = formData.nickname;
		email = formData.email;
	} else {
		cookies = req.cookies;
		nickname = cookies.nickname || '';
		email = cookies.email || '';
		// website = cookies.website || '';
	}

	var userInfo = '';
	if (nickname) {
		userInfo = nickname + (email ? '(' + email + ')' : '');
	}
	userInfo = userInfo ? userInfo : '无记录';

	return userInfo;
}