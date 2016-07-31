import { Fetch } from 'whatwg-fetch';
import assign from 'object-assign';

const defaultOpts = {
	method: "POST",
	headers: {
		"content-type": "application/json;charset=utf-8"
	},
	credentials: 'same-origin' // fetch默认不支持响应set-cookie到浏览器，所以要配置一下
}

/*
@url{String}     the fetch url
@data{Object}    the post data
@return {Promise Object} 
*/
export default function(url, data = {}) {

	/*
		返回一个promise对象	
	*/
	return fetch(
		url,
		assign({}, defaultOpts, {
				body: JSON.stringify(data)
			}
		)
	)
	.then( res => res.json() )
}

