export default function parseComment(str) {

	// 提取blockquote
	// let blockquote = str.replace(/<blockquote>[\s\S]*?(<pre>[\s\S]*?<\/pre>)([\s\S]*)?<\/blockquote>/, function(match, $1, $2) {
	// 	let name = $1
	// 		.replace(/\n/g, '')
	// 		.replace(/<\/?([^pre])>/g, function(match, $1) {
	// 			return '&lt;' + $1 + '&gt;';
	// 		})
	// 		.replace(/<(\/?script)>/g, '');
	// 	let content = $2.replace(/(.+)(?!>)\n/g, function(match, $1) {
	// 		return '<p>' + $1 + '</p>';
	// 	})
	// 	.replace(/\n/g, '')
	// 	.replace(/<(\/?script)>/g, '');
		
	// 	return '<blockquote>' + name + content + '</blockquote>'

	// });
	let blockquote = replaceQuote(str);

	// console.log(blockquote);

	// 过滤 除 a strong b 外的所有标签
	// str = str
	// 	.replace(/<blockquote>[\s\S]*<\/blockquote>/g, '')
	// 	.replace(/<a[\s\S]*?href="(.*)?"[\s\S]*?>([\s\S]*)?<\/a>/g, function(match, $1, $2) {
	// 		return '<a href="' 
	// 			   + $1.replace(/^(https?:\/\/)?.*/, function(match, capture) {
	// 			        // 有捕获组，已有前缀
	// 			        if ( capture ) {
	// 			          return match;
	// 			        } else {
	// 			          return 'http://' + match;
	// 			        }
	// 			      })
	// 			    + '" target="_blank">' 
	// 				+ $2.replace(/[\n\r]/g, '')
	// 					.replace(/</g, '&lt;')
	// 					.replace(/>/g, '&gt;')
	// 				+ '</a>';
	// 	})
	// 	.replace(/<strong.*?>([\s\S]*)?<\/strong>/g, function(match, $1) {
	// 		return '<strong>' 
	// 			+ $1.replace(/\n/g, '')
	// 				.replace(/</g, '&lt;')
	// 				.replace(/>/g, '&gt;')
	// 			+ '</strong>'; 
	// 	})
	// 	.replace(/<b.*?>([\s\S]*)?<\/b>/g, function(match, $1) {
	// 		return '<b>' 
	// 			+ $1.replace(/[\n\r]/g, '')
	// 				.replace(/</g, '&lt;')
	// 				.replace(/>/g, '&gt;')
	// 			+ '</b>'; 
	// 	})
	// 	.replace(/<(?!\/?[a |strong|b])/g, '&lt;')
	// 	.replace(/<\/([^a|strong|b])>/g, function(match, $1) {
	// 		return '&lt;' + $1 + '&gt;';
	// 	})
	// 	.replace(/([^a|"_blank"|strong|b])>/g, function(match, $1) {
	// 		return $1 + '&gt;';
	// 	})
	// 	.replace(/(.+)\n/g, function(match, $1) {
	// 		return ('<p>' + $1 + '</p>').replace(/\n/g, '');
	// 	})
	// 	.replace(/<(\/?script)>/g, function(match, $1) { return '&lt;' + $1 + '&gt;' });


	return {
		__html: blockquote.replace(/>\n*/g, '>'),
	};
};
// 贪婪匹配
var blockReg = /<blockquote>[\s\S]*?(<pre>[\s\S]*?<\/pre>)([\s\S]*)<\/blockquote>/;

function replaceQuote(str) {
	
	let matchStr = str.match(blockReg) || [];

	if ( matchStr[0] ) {
		return matchStr[0].replace(blockReg, function(match, $1, $2) {
			let name = $1
				.replace(/\n/g, '')
				.replace(/<\/?([^pre])>/g, function(match, $1) {
					return '&lt;' + $1 + '&gt;';
				})
				.replace(/<(\/?script)>/g, function(match, $1) { return '&lt;' + $1 + '&gt;' });

			let content = '';

			if( blockReg.test($2) ) {
				content = replaceQuote($2);
			} else {
				content = replaceContent($2.replace(/<(\/?blockquote)>/g, function(match, $1) { return '&lt;' + $1 + '&gt;' }));
			}
			//  else {
			// 	content = $2.replace(/(.+)(?!>)\n/g, function(match, $1) {
			// 		return '<p>' + $1 + '</p>';
			// 	})
			// 	.replace(/\n/g, '')
			// 	.replace(/<(\/?script)>/g, '');
			// }
			
			return '<blockquote>' + name + content + '</blockquote>'

		}) + replaceContent(str);
	} else {
		// console.log(str)
		return replaceContent(str);
	}

}

function replaceContent(str) {
	return str
		.replace(/<blockquote>[\s\S]*<\/blockquote>/g, '')
		.replace(/<a[\s\S]*?href="(.*)?"[\s\S]*?>([\s\S]*)?<\/a>/g, function(match, $1, $2) {
			return '<a href="' 
				   + $1.replace(/^(https?:\/\/)?.*/, function(match, capture) {
				        // 有捕获组，已有前缀
				        if ( capture ) {
				          return match;
				        } else {
				          return 'http://' + match;
				        }
				      })
				    + '" target="_blank">' 
					+ $2.replace(/[\n\r]/g, '')
						.replace(/</g, '&lt;')
						.replace(/>/g, '&gt;')
					+ '</a>';
		})
		.replace(/<strong.*?>([\s\S]*)?<\/strong>/g, function(match, $1) {
			return '<strong>' 
				+ $1.replace(/\n/g, '')
					.replace(/</g, '&lt;')
					.replace(/>/g, '&gt;')
				+ '</strong>'; 
		})
		.replace(/<b.*?>([\s\S]*)?<\/b>/g, function(match, $1) {
			return '<b>' 
				+ $1.replace(/[\n\r]/g, '')
					.replace(/</g, '&lt;')
					.replace(/>/g, '&gt;')
				+ '</b>'; 
		})
		.replace(/<code.*?>([\s\S]*)?<\/code>/g, function(match, $1) {
			return '<code>' 
				+ $1.replace(/</g, '&lt;')
					.replace(/>/g, '&gt;')
				+ '</code>'; 
		})
		.replace(/<(?!(\/?a[ |>])|(\/?strong)|(\/?b)|(\/?code))/g, '&lt;')
		.replace(/<\/([^a|strong|b|code])>/g, function(match, $1) {
			return '&lt;' + $1 + '&gt;';
		})
		.replace(/([^a|"_blank"|strong|b|code])>/g, function(match, $1) {
			return $1 + '&gt;';
		})
		.replace(/!(<\/?code>)(.+)\n/g, function(match, $1) { // 这个是干嘛的呢？
			return ('<p>' + $1 + '</p>').replace(/\n/g, '');
		})
		.replace(/(<\/?code>)\n/g, function(match, $1) {
			return $1;
		})
		// .replace(/<(\/?script)>/g, function(match, $1) { return '&lt;' + $1 + '&gt;' })
		// .replace(/<(\/?br\/?)>/g, function(match, $1) { return '&lt;' + $1 + '&gt;' })
		.replace(/\n+/g, '\n');
}