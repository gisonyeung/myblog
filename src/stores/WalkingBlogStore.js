import { EventEmitter } from 'events';
import assign from 'object-assign';
import fetch from '../utils/fetch';
import Api from '../constants/Api';
import _ from 'lodash';

const WalkingBlogStore = assign({}, EventEmitter.prototype, {

	blogs: [],

	beginIndex: 1,

	lastIndex: 0,

	blog: {
		blogId: -1,
		time: {
			createAt: '0000-00-00',
			updateAt: '0000-00-00',
		},
		photo: '',
		content: '',
		tags: '',
		numbers: {
			view: 0,
			comment: 0,
		},
	},

	nearBlog: {
		prev: -1,
		next: -1,
	},

	comments: [],

	quoteData: {
		nickname: '',
		email: '',
		website: '',
		content: '',
		time: '0000-00-00',
	},

	getBlogList: function() {
		return this.blogs;
	},

	fetchBlogList: function() {

		let beginIndex = this.beginIndex;

		fetch(Api.walkingBlog, {
			beginIndex: beginIndex
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

	getBlogDetail: function() {
		return this.blog;
	},

	fetchBlogDetail: function(blogId) {
		fetch(Api.walkingBlogDetail, {
			blogId: blogId
		})
		.then(data => {
			if ( data.result == 'success' ) {
				this.blog = data.blog;
				this.emitEvent('WALKINGBLOG_DETAIL');
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
		fetch(Api.nearWalkingBlog, {
			blogId: blogId
		})
		.then(data => {
			if ( data.result == 'success' ) {
				this.nearBlog = data.nearBlog;
				console.log(data.nearBlog);
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
		fetch(Api.walkingBlogComment, {
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


		fetch(Api.addWalkingBlogComment, {
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

	replyComment: function(data) {
		this.quoteData = data;
		this.emitEvent('REPLY_COMMENT', data);
	},

	cancelReply: function() {
		this.quoteData = {
			nickname: '',
			email: '',
			website: '',
			content: '',
			time: '0000-00-00',
		};
		this.emitEvent('REPLY_COMMENT', this.quoteData);
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

export default WalkingBlogStore;