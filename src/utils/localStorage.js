import parseJSON from './parseJSON'

export default {

	get: function(table) {
		table = localStorage.getItem(table);
		return parseJSON(table);
	},

	set: function(table, str) {
		str = JSON.stringify(str);
		localStorage.setItem(table, str);
	},

};