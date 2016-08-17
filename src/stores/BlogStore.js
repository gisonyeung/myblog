import { EventEmitter } from 'events';
import assign from 'object-assign';
import fetch from '../utils/fetch';
import Api from '../constants/Api';

const BlogStore = assign({}, EventEmitter.prototype, {


	blogs: [],

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

		const that = this;

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