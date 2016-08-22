module.exports = function getClientIp(req) {

	var address = ''

	try {
		address = req.headers['x-forwarded-for'] ||
		    req.connection.remoteAddress ||
		    req.socket.remoteAddress;
	} catch(e) {
		address = '未知IP';
	}


    return address.replace('::ffff:', '');
};