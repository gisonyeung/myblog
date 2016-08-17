module.exports = function safeHTML(str) {
	return str.replace(/</g, '&lt;').replace(/>/g, '&gt;') || '';
}