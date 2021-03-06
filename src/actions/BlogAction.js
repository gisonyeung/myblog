import AppDispatcher from '../dispatcher/AppDispatcher';

const BlogAction = {
	
	fetchCount() {
		AppDispatcher.dispatch({
			actionType: 'FETCH_BLOGS_COUNT',
		});
	},

	fetchBlogs(pageNum) {
		AppDispatcher.dispatch({
			actionType: 'FETCH_BLOGS',
			pageNum: pageNum
		});
	},

	fetchPages() {
		AppDispatcher.dispatch({
			actionType: 'FETCH_PAGES',
		});
	},

	fetchBlogDetail(blogId) {
		AppDispatcher.dispatch({
			actionType: 'FETCH_BLOG_DETAIL',
			blogId: blogId,
		});
	},

	fetchNearBlog(blogId) {
		AppDispatcher.dispatch({
			actionType: 'FETCH_NEAR_BLOG',
			blogId: blogId,
		});
	},

	fetchBlogComment(blogId) {
		AppDispatcher.dispatch({
			actionType: 'FETCH_BLOG_COMMENT',
			blogId: blogId,
		});
	},

	sendComment(formData) {
		AppDispatcher.dispatch({
			actionType: 'SEND_BLOG_COMMENT',
			formData: formData,
		});
	},

	addLike(blogId) {
		AppDispatcher.dispatch({
			actionType: 'ADD_BLOG_LIKE',
			blogId: blogId,
		});
	},

	quoteComment(data) {
		AppDispatcher.dispatch({
			actionType: 'QUOTE_COMMENT',
			data: data,
		});
	},

	fetchBoardComments() {
		AppDispatcher.dispatch({
			actionType: 'FETCH_BOARD_COMMENT',
		});
	},

	fetchBoardComments_more() {
		AppDispatcher.dispatch({
			actionType: 'FETCH_BOARD_COMMENT_MORE',
		});
	},



	sendBoardComment(formData) {
		AppDispatcher.dispatch({
			actionType: 'SEND_BOARD_COMMENT',
			formData: formData,
		});
	},



	









	
};

export default BlogAction;