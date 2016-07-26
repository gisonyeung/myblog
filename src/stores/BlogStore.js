import { EventEmitter } from 'events';
import assign from 'object-assign';
import blogData from '../data/blogData'

const BlogStore = assign({}, EventEmitter.prototype, {

	blogs: [],

	allpagesNum: 1,

	getBlogList: function() {
		return this.blogs;
	},

	fetchBlogs: function(pageNum) {
		this.blogs = blogData;
		this.emitEvent('BLOG_LIST');
	},

	getPageNum: function() {
		return this.allpagesNum;
	},

	fetchPages: function() {
		this.allpagesNum = 10;
		this.emitEvent('BLOG_PAGE');
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