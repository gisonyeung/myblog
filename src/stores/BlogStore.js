import { EventEmitter } from 'events';
import assign from 'object-assign';
import fetch from '../utils/fetch';
import Api from '../constants/Api';

const BlogStore = assign({}, EventEmitter.prototype, {


	blogs: [],
	pageNum: -1,

	allpagesNum: 1,

	isFirstFetch_pageNum: true,

	blog: {},

	blogCount: {
		isFirstFetch: true,
		count: 0,
	},

	nearBlog: {
		prev: {
			blogId: -1,
			title: '',
		},
		next: {
			blogId: -1,
			title: '',
		}
	},

	quoteData: {
		email: '',
		time: '',
		nickname: '',
		content: '',
	},

	comments: [],

	boardComments: [],

	boardComments_record: {
		isOpen: true,
		index: 0,
		allCount: 0,
	},

	isFirstFetch_board: true,

	getBlogsCount: function() {
		return this.blogCount.count;
	},

	fetchBlogsCount: function() {

		if ( this.blogCount.isFirstFetch ) {

			fetch(Api.blogCount)
			.then(data => {
				if( data.result == 'success' ) {
					this.blogCount.isFirstFetch = false;
					this.blogCount.count = data.count;
					this.emitEvent('BLOG_COUNT', data.count);
				}
			})
			.catch(err => {
				console.log(err);
			});

		} else {
			this.emitEvent('BLOG_COUNT', this.blogCount.count);
		}

	},

	getBlogList: function() {
		return this.blogs;
	},

	getPageNum: function() {
		return this.pageNum;
	},

	fetchBlogs: function(pageNum) {
		fetch(Api.homeBlog, {
			page: pageNum
		})
		.then(data => {
			if( data.result == 'success' ) {
				this.blogs = data.blogs;
				this.pageNum = pageNum;
				this.emitEvent('BLOG_LIST');
			}
		})
		.catch(err => {
			console.log(err);
		});
	},

	getPageNum: function() {
		return this.allpagesNum;
	},

	fetchPages: function() {

		if ( this.isFirstFetch_pageNum ) {

			fetch(Api.homePage)
			.then(data => {
				if( data.result == 'success' ) {
					this.isFirstFetch_pageNum = false;
					this.allpagesNum = data.page;
					this.emitEvent('BLOG_PAGE');
				}
			})
			.catch(err => {
				console.log(err);
			});

		} else {

			this.emitEvent('BLOG_PAGE');

		}

		
	},

	getBlogDetail: function() {

		return {
			"_id": "58caaa4bee1d31344d29c748",
			"blogId": 12,
			"title": "Web 缓存",
			"summary": "本文详细介绍浏览器缓存策略，粗略介绍应用层缓存如 LocalStorage，SessionStorage， Cookie 的一些异同和使用场景。",
			"content": "<p>Web 缓存主要用来保存一些常见的文档资源，当 Web 请求抵达缓存中时，如果本地有“已缓存的”副本，就可以从本地存储设备而不是原始服务器中提取这个文档。</p>\n\n<p>使用缓存有以下优点：</p>\n\n<ul>\n<li>减少冗余的数据传输。</li>\n\n<li>缓解网络瓶颈问题，不需要更多的带宽就能够更快地加载页面。</li>\n\n<li>降低对原始服务器的要求。</li>\n\n<li>降低距离时延。</li>\n</ul>\n\n<h1 id=\"\">浏览器缓存策略</h1>\n\n<p>浏览器缓存分为本地缓存（强缓存），协商缓存（再验证）两个阶段。</p>\n\n<h2 id=\"-1\">本地缓存</h2>\n\n<p>本地缓存以<strong>资源URL</strong>作为唯一索引。</p>\n\n<p>在用户第一次访问一个资源文件时，浏览器会将<strong>符合条件</strong>的资源文件添加到缓存池中。在用户通过浏览器访问一个资源文件时，浏览器会先从本地缓存池中检索有无该文件的缓存，<strong>符合命中条件</strong>则直接使用该缓存资源，如缓存池中没有该文件，则会去服务器上请求该文件。</p>\n\n<p>在 Chrome 中，可以在地址栏中访问<code>chrome://cache</code>查看缓存池。另外要知道的是， Chrome 在将文件缓存在本地时实际上是以二进制方式存储的，具体可以访问<code>chrome://version</code>查看缓存文件存放路径（<code>个人资料存放路径/Cache</code>），如果希望直接查看文件，可以下载工具<code>Chrome cache View</code>。</p>\n\n<p><strong>符合什么条件的资源可以被添加到缓存池中呢？</strong></p>\n\n<p>HTTP 有两个首部用来控制浏览器是否进行本地缓存：<code>Expires</code>和<code>Cache-Control</code>。HTTP 允许原始服务器向每个文档附加一个“过期日期”，说明可以在多长时间内将这些内容视为新鲜的。</p>\n\n<p><strong>Expires 首部</strong>：</p>\n\n<pre><code>HTTP/ 1.1 200 OK\nDate: Sat, 20 Jun 2002, 14:30:00 GMT\ncontent-type: text/plain\nContent-length: 67\nExpires: Fri, 05 Jul 2002, 05:00:00 GTM\n</code></pre>\n\n<p><strong>Cache-Control 首部</strong>：</p>\n\n<pre><code>HTTP/ 1.1 200 OK\nDate: Sat, 20 Jun 2002, 14:30:00 GMT\ncontent-type: text/plain\nContent-length: 67\nCache-Control: max-age=484200\n</code></pre>\n\n<p>相对于 Cache-Control，<code>Expires</code> 是一个较老的首部（HTTP/1.0），其接受一个 Date 值指定文件的过期日期。该值是一个绝对日期，浏览器判断文件是否过期时，对比的是用户机器上的时间而不是服务器上的时间。所以使用 Expires 首部可能会出现的一个问题就是，用户本地时间是会影响到原先的缓存意图的。</p>\n\n<p>为了解决这个问题，HTTP/1.1 的<code>Cache-Control</code>应运而生。Cache-Control 接受一个秒数作为文档的生存时间。这个时间是一个相对时间，一个倒计时的秒数，不依赖于机器时间。</p>\n\n<p>启用本地缓存时，选用其中一个首部即可，推荐使用较新的 Cache-Control 。如果同时使用 Expires 和 Cache-Control 首部，那么浏览器将以优先值更高的 Cache-Control 为准。</p>\n\n<p>如果文件是通过缓存获得的，network 上该资源的请求会显示<code>200 OK (from disk cache)</code>，此时<strong>该请求是不会发送到原始服务器的</strong>。\n<img src=\"/blog/1489665659511.png\" alt=\"\" /></p>\n\n<h2 id=\"cachecontrol\">Cache-Control 控制缓存的能力</h2>\n\n<p>Cache-Control 有一些可选值，可以用来控制缓存方式。</p>\n\n<ul>\n<li>Cache-Control: no-store，标识为 no-store 的响应会禁止缓存对响应进行拷贝。</li>\n\n<li>Cache-Contro: no-cache，标识为 no-cache 的响应实际上是可以存储在本地缓存区中的。只是在与原始服务器进行新鲜度再验证之前，缓存不能将其提供给客户端使用。这个首部使用 do-not-serve-from-cache-without-revalidation 这个名字会更恰当一些。</li>\n\n<li>Cache-Control: max-age，表示的是从服务器将文档传来之时起，可以认为此文档处于新鲜状态的秒数。</li>\n\n<li>Cache-Control：must-revalidate，可配置缓存，这个响应首部告诉缓存，在实现没有跟原始服务器进行再验证的情况下，不能使用这个对象的陈旧副本。服务器通过返回 304 Not Modified 可以让客户端使用缓存陈旧（过期）的文档，以提高性能。当然，服务器也可以随意提供新鲜的副本。如果在缓存进行 must-revalidate 新鲜度检查时，原始服务器不可用，缓存就必须返回一条 504 Gateway Timeout 错误。</li>\n</ul>\n\n<h1 id=\"-2\">协商缓存（再验证）</h1>\n\n<p>当本地缓存文件到达缓存期限时，如果此时用户再次发起请求，浏览器将会给原始服务器发出一个 HTTP 请求，假使服务器的文件并没有进行过任何更新，这时缓存虽然是过期的但实际上仍是有效的。</p>\n\n<p>对于这种情况，如果服务器这时直接重发一份相同的文件，那么就可能造成浪费。针对此，HTTP 也制定了一些策略来进行优化，我们将这个阶段成为<strong>协商缓存</strong>或<strong>再验证</strong>。</p>\n\n<p>当缓存未命中时，浏览器需要对它们缓存的副本进行新鲜度检测，看看它们是否仍是服务器上最新的版本。为了有效地进行再验证，HTTP 定义了一些特殊的请求，不用从服务器上获取整个对象，就可以较快地检测出内容是否是最新的。我们将这些请求称为<strong>“条件 GET”</strong>请求。</p>\n\n<ul>\n<li>当服务器的资源未发生更新时，服务器会返回<code>304 Not Modified</code>响应，不会返回文档的主体，这样一来，网络请求效率就会比普通 GET 请求高一点。</li>\n\n<li>当服务器的资源发生更新时，服务器会返回<code>200</code>响应，并在报文体中携带新的文件内容，这种情况下，与普通 GET 请求获取资源效率无异。</li>\n</ul>\n\n<p>HTTP 定义了 5 个条件请求首部，这里详细介绍最有用的 2 个首部：<code>If-Modified-Since</code>和<code>If-None-Match</code>。所有的条件首部都以前缀<code>If-</code>开头。下表列出了在缓存再验证中使用的条件请求两个首部。</p>\n\n<table>\n<thead>\n<tr>\n<th>首部</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>If-Modified-Since:&lt; date ></td>\n<td>如果从指定日期之后文档被修改过了，就执行请求的方法获取新的内容。与服务器响应首部 Last-Modified 配合使用。</td>\n</tr>\n<tr>\n<td>If-None-Match:&lt; tag ></td>\n<td>服务器可以为文档提供特殊的标签（ETag），而不是将其与最近修改日期相匹配，这些标签就像序列号一样。如果已缓存标签与服务器文档中的标签有所不同，If-None-Match 首部就会执行请求的方法，获取新的内容。与服务器响应首部 ETag 配合使用。</td>\n</tr>\n</tbody>\n</table>\n\n<blockquote>\n  <p>其他条件首部包括：</p>\n  \n  <ul>\n  <li>If-Unmodified-Since：在进行部分文件的传输时，获取文件的其余部分之前要确保文件未发生变化，此时这个首部是非常有用的。</li>\n  \n  <li>If-Range：支持对不完整文档的缓存</li>\n  \n  <li>If-Match：用于与 Web 服务器打交道时的并发控制</li>\n  </ul>\n</blockquote>\n\n<h2 id=\"ifmodifiedsincedate\">If-Modified-Since:Date 再验证</h2>\n\n<ul>\n<li>如果自指定日期后，文档被修改了，<code>If-Modified-Since</code>条件就为真，通常这个条件 GET 就会成功执行。携带新首部的新文档会被返回给缓存，新首部除了其他信息之外，还包含了一个新的过期日期。</li>\n\n<li>如果自指定日期后，文档没被修改过，条件就为架，会向客户端返回一个小的<code>304 Not Modified</code>响应报文，不会返回文档的主体。但会返回那些需要在源端更新的首部，比如会发送一个新的过期日期。而一些没有被更新的首部则不会被返回，例如<code>Content-Type</code>。</li>\n</ul>\n\n<p>该字段对应的服务器响应首部为<code>Last-Modified</code>，服务器在返回资源时会携带此首部，如果携带有此首部的资源，浏览器将会将它的值附加在该文档的<code>If-Modified-Since</code>中，在下一次对该资源进行再验证时一同发送。</p>\n\n<blockquote>\n  <p>如果有一个不认识 If-Modified-Since 首部的老服务器收到了条件请求，它会将其作为一个普通的 GET 来解释。在这种情况下，系统仍然能够工作。</p>\n</blockquote>\n\n<h2 id=\"ifnonematchetag\">If-None-Match:ETag 实体标签再验证</h2>\n\n<p>有些情况下只使用最后修改日期来进行再验证是不够的。</p>\n\n<ul>\n<li>有些文档可能会被周期性地重写，但实际包含的数据常常是一样的。尽管内容没有变化，但修改日期会发生变化。</li>\n\n<li>有些文档被修改了，但所做的修改并不重要，比如对拼写或注释的修改。</li>\n\n<li>有些服务器提供的文档会在亚秒间隙发生变化，比如实时监视器，对这些服务器来说，以一秒为粒度的修改日期可能就不够用了。</li>\n</ul>\n\n<p>为了解决这些问题，HTTP 允许用户对被称为实体标签（ETag）的“版本标识符”进行比较。实体标签是附加到文档上的任意标签，通常是由服务器来制定生成规则的。它们可能包含了文档的序列号或版本号，或者是文档内容的校验及其他指纹信息。</p>\n\n<p>当发布者对文档进行修改时，可以修改文档的实体标签来说明这个新的版本。这样，如果实体标签被修改了，缓存就可以用<code>If-None-Match</code>条件首部来 GET 文档的新副本了。</p>\n\n<p>例如客户端发送一个实体标签为 v2.6 的条件请求：</p>\n\n<pre><code>GET /some.html HTTP/1.0\nIf-None-Match: \"v2.6\"\n</code></pre>\n\n<p>服务器响应：</p>\n\n<pre><code>HTTP/1.0 304 Not Modified\nDate: Wed, 03 Jul 2002, 19:18:23 GMT\nETag: \"v2.6\"\nExpires: Fri, 05 Jul 2002, 05:00:00 GMT\n</code></pre>\n\n<p>日常开发中，ETag 通常可以是一个文档的 MD5 值，在文档未发生变化时，文档生成的 MD5 值也不会变化。在服务器端可以这样处理客户端的条件 GET 请求，这里以 Node JS 举例：</p>\n\n<pre><code>var etag = require('etag');\n\nfs.readFile(filePath, function(err, html) {\n    // 如果有错误，或者render的内容为空，则直接响应 404，并且不设置 Cache-Control 响应头\n    if (err || !html) {\n        res.status(404).end('Not Found');\n        return;\n    }\n\n    // 渲染成功才设置cache-control的响应头\n    res.setHeader('Cache-Control', 'public, max-age=484200');\n\n     // 设置Etag，以及检查Etag的变化\n     var requestEtag = req.headers['if-none-match'];\n     var currentEtag = etag(html);\n\n    // 如果有带If-None-Match请求头，表示客户端本地有缓存，则判断Etag是否有改变\n    if (requestEtag &amp;&amp; (requestEtag === currentEtag)) return res.status(304).end();\n\n    // 返回新的 ETag 头\n    res.setHeader('ETag', currentEtag);\n\n    res.status(200).end(html);\n});\n</code></pre>\n\n<h2 id=\"-3\">什么时候使用实体标签和最近修改日期</h2>\n\n<p>如果服务器回送了一个实体标签，HTTP/1.1 客户端就必须使用实体标签验证器。如果服务器只回送了一个 Last-Modified 值，客户端就可以使用 If-Modified-Since 验证。如果实体标签和最后修改日期都提供了，客户端就会同时使用这两种方法验证，当两个验证都同时通过时，才会返回 304 Not Modified。</p>\n\n<p>至此，浏览器缓存策略已经介绍完毕。接下来介绍应用层缓存，如 LocalStorage、SessionStorage、Cookie 的合理使用场景。</p>\n\n<h1 id=\"-4\">应用层缓存</h1>\n\n<p>LocalStorage、SessionStorage、Cookie 属于应用层的缓存，是可供开发者支配的缓存空间。</p>\n\n<p><strong>LocalStorage：</strong></p>\n\n<ul>\n<li>大小：一般为 5MB</li>\n\n<li>生命期：除非被清除，否则永久保存</li>\n\n<li>易用性：高，源生接口容易使用</li>\n\n<li>仅在客户端（即浏览器）中保存，不参与和服务器的通信</li>\n</ul>\n\n<p><strong>SessionStorage：</strong></p>\n\n<ul>\n<li>大小：一般为 5MB</li>\n\n<li>生命期：仅在当前会话下有效，关闭页面或浏览器后被清除</li>\n\n<li>易用性：高，源生接口容易使用</li>\n\n<li>仅在客户端（即浏览器）中保存，不参与和服务器的通信</li>\n</ul>\n\n<p><strong>Cookie：</strong></p>\n\n<ul>\n<li>大小：一般为 4KB</li>\n\n<li>生命期：一般由服务器生成，可设置失效时间。如果在浏览器端生成 Cookie，默认是关闭浏览器后失效\n*易用性：差，需要程序员自己封装，源生的Cookie接口不友好</li>\n\n<li>每次请求会默认携带在HTTP头中，如果使用 cookie 保存过多数据会降低 HTTP 利用率</li>\n</ul>\n\n<p>因为考虑到每个 HTTP 请求都会带着 Cookie 的信息，所以 Cookie 当然是能精简就精简，比较常用的一个应用场景就是判断用户是否登录。针对登录过的用户，服务器端会在他登录时往 Cookie 中插入一段加密过的唯一辨识单一用户的辨识码，下次只要读取这个值就可以判断当前用户是否登录。曾经还有利用 Cookie 来保存用户在电商网站的购物车信息，而如今有了更胜任此场景的 LocalStorage。</p>\n\n<p>LocalStorage 接替了 Cookie 管理购物车的工作，同时也能胜任其他一些工作。比如 HTML5 游戏通常会产生一些本地数据，LocalStorage 也是非常适用的。如果遇到一些内容特别多的表单，为了优化用户体验，我们可能要把表单页面拆分成多个子页面，然后按步骤引导用户填写。这时候 SessionStorage 的作用就发挥出来了。</p>\n\n<ul>\n<li><em>推荐书籍：《HTTP 权威指南》</em></li>\n</ul>",
			"category": "前端知识",
			"tags": "基础知识,面试总结,底层机制,进阶知识",
			"__v": 0,
			"isShow": true,
			"time": {
				"updateAt": "2017-03-16T15:37:21.721Z",
				"createAt": "2017-03-16T15:07:55.443Z"
			},
			"numbers": {
				"comment": 5,
				"like": 22,
				"view": 780
			}
		};
	},

	fetchBlogDetail: function(blogId) {
		this.blog = this.getBlogDetail();
		console.log('fetch',this.blog)
		this.emitEvent('BLOG_DETAIL');
		// fetch(Api.blogDetail, {
		// 	blogId: blogId
		// })
		// .then(data => {
		// 	if ( data.result == 'success' ) {
		// 		this.blog = this.getBlogDetail();
		// 		this.emitEvent('BLOG_DETAIL');
		// 	} 
		// })
		// .catch(err => {
		// 	console.log(err);
		// });
	},

	getNearBlog: function() {
		return this.nearBlog;
	},

	fetchNearBlog: function(blogId) {
		fetch(Api.nearBlog, {
			blogId: blogId
		})
		.then(data => {
			if ( data.result == 'success' ) {
				this.nearBlog = data.nearBlog;
				this.emitEvent('BLOG_NEAR');
			} 
		})
		.catch(err => {
			console.log(err);
		});
	},

	getComments: function() {
		return this.comments;
	},

	fetchComments: function(blogId) {
		fetch(Api.blogComment, {
			blogId: blogId
		})
		.then(data => {
			if ( data.result == 'success' ) {
				this.comments = data.comments;
				this.emitEvent('BLOG_COMMENT');
			} 
		})
		.catch(err => {
			console.log(err);
		});
	},

	sendComment: function(formData) {

		const that = this;

		fetch(Api.addBlogComment, {
			blogId: formData.blogId,
			nickname: formData.nickname,
			email: formData.email,
			website: formData.website,
			content: formData.content,
			quoteData: that.quoteData,
		})
		.then(data => {
			if ( data.result == 'success' ) {
				this.emitEvent('SEND_COMMENT');
			} else {
				this.emitEvent('SEND_COMMENT', data.reason);
			}
		})
		.catch(err => {
			console.log(err);
		});
	},

	sendBoardComments: function(formData) {

		const that = this;

		fetch(Api.addBoardComment, {
			nickname: formData.nickname,
			email: formData.email,
			website: formData.website,
			content: formData.content,
			quoteData: that.quoteData,
		})
		.then(data => {
			if ( data.result == 'success' ) {
				this.emitEvent('SEND_COMMENT');
			} else {
				this.emitEvent('SEND_COMMENT', data.reason);
			}
		})
		.catch(err => {
			console.log(err);
		});
	},



	addLike: function(blogId) {
		fetch(Api.addBlogLike, {
			blogId: blogId,
		})
		.then(data => {
			if ( data.result == 'success' ) {
				this.emitEvent('REFRESH_LIKE');
			} else {
				this.emitEvent('REFRESH_LIKE', data.reason);
			}
		})
		.catch(err => {
			console.log(err);
		});
	},

	quoteComment: function(data) {
		this.quoteData = data;
		this.emitEvent('QUOTE_COMMENT', data);
	},


	getBoardComments: function() {

		if ( this.isFirstFetch_board ) {
			this.fetchBoardComments();
		}

		return this.boardComments;
	},

	fetchBoardComments: function() {

		fetch(Api.boardComment)
		.then(data => {
			if ( data.result == 'success' ) {
				this.isFirstFetch_board = false;
				this.boardComments = data.comments;
				this.boardComments_record.index = data.comments.length;
				this.boardComments_record.allCount = data.allCount;
				this.emitEvent('BOARD_COMMENT');
			} 
		})
		.catch(err => {
			console.log(err);
		});

	},

	getBoardRecord: function() {
		return this.boardComments_record;
	},

	fetchBoardComments_more: function() {

		const that = this;

		if ( this.boardComments_record.isOpen ) {

			// 在新请求结果返回前不允许再请求，防止连续点击
			this.boardComments_record.isOpen = false;

			fetch(Api.boardCommentMore, {
				index: that.boardComments_record.index,
			})
			.then(data => {
				if ( data.result == 'success' ) {
					this.boardComments = this.boardComments.concat(data.comments);
					this.boardComments_record.index += data.comments.length;
					this.emitEvent('BOARD_COMMENT');
				}
				this.boardComments_record.isOpen = true;
			})
			.catch(err => {
				console.log(err);
				this.boardComments_record.isOpen = true;
			});
			
		}

	},

	emitEvent: function(event, data) {
		this.emit(event, data);
	},

	addChangeListener: function(event, callback) {
		this.on(event, callback);
	},

	removeChangeListener: function(event, callback) {
		this.removeListener(event, callback);
	}

});

export default BlogStore;