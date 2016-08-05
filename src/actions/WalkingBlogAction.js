import AppDispatcher from '../dispatcher/AppDispatcher'

const WalkingBlogAction = {

	fetchBlogs() {
		AppDispatcher.dispatch({
			actionType: 'FETCH_WALKINGBLOGS',
		});
	},

	fetchBlogDetail(blogId) {
		AppDispatcher.dispatch({
			actionType: 'FETCH_WALKINGBLOG_DETAIL',
			blogId: blogId,
		});
	},

	fetchBlogComment(blogId) {
		AppDispatcher.dispatch({
			actionType: 'FETCH_WALKINGBLOG_COMMENT',
			blogId: blogId,
		});
	},

	sendComment(formData) {
		AppDispatcher.dispatch({
			actionType: 'SEND_WALKINGBLOG_COMMENT',
			formData: formData,
		});
	},

	replyComment(data) {
		AppDispatcher.dispatch({
			actionType: 'REPLY_WALKINGBLOG_COMMENT',
			data: data,
		});
	},

	cancelReply() {
		AppDispatcher.dispatch({
			actionType: 'CANCEL_REPLY_COMMENT',
		});
	},

	fetchNearBlog(blogId) {
		AppDispatcher.dispatch({
			actionType: 'FETCH_NEAR_WALKINGBLOG',
			blogId: blogId,
		});
	},



};

export default WalkingBlogAction;