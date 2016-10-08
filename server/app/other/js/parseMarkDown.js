/*
	输入markdown格式文本，返回解析后的html
	@param { String } markdwn
	@return { String } html
*/
function parseMarkDown(str) {

	var html = '';

	html = str
		.replace(/\n*(#+)\s+(.*)/g, function(match, $1, $2) { // 格式化标题

			var h = '<h{{size}}>{{content}}</h{{size}}>';
			var size = $1.length < 2 ? $1.length : 2;


			return h
				.replace(/{{size}}/g, size)
				.replace(/{{content}}/, $2.trim());

		})
		.replace(/\n*(\+\s+.*)\n{2})/g, function(match, $1, $2, $3) { // 有序列表ol

			console.log($1);
			console.log($2);
			console.log($3);
			return match;

		})

		.replace(/\n*(.*)\n/, function(match, $1) { // 将换行替换为p标签，这个应该放在最末尾

			var p = '<p>{{content}}</p>';

			return p.replace(/{{content}}/, $1);

		});

	return html;


};