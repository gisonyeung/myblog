import { EventEmitter } from 'events';
import assign from 'object-assign';
import blogData from '../data/blogData';
import fetch from '../utils/fetch';
import Api from '../constants/Api';

const BlogStore = assign({}, EventEmitter.prototype, {


	blogs: [],

	allpagesNum: 1,

	blog: {},

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

	comments: [],

	getBlogList: function() {
		return this.blogs;
	},

	fetchBlogs: function(pageNum) {
		fetch(Api.homeBlog, {
			page: pageNum
		})
		.then(data => {
			if( data.result == 'success' ) {
				this.blogs = data.blogs;
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
		fetch(Api.homePage)
		.then(data => {
			if( data.result == 'success' ) {
				this.allpagesNum = data.page;
				this.emitEvent('BLOG_PAGE');
			}
		})
		.catch(err => {
			console.log(err);
		});
		
	},

	getBlogDetail: function() {
		return this.blog;
	},

	fetchBlogDetail: function(blogId) {
		fetch(Api.blogDetail, {
			blogId: blogId
		})
		.then(data => {
			if ( data.result == 'success' ) {
				this.blog = data.blog;
				this.emitEvent('BLOG_DETAIL');
			} 
		})
		.catch(err => {
			console.log(err);
		});
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
		fetch(Api.addblogComment, {
			blogId: formData.blogId,
			nickname: formData.nickname,
			email: formData.email,
			website: formData.website,
			content: formData.content,
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