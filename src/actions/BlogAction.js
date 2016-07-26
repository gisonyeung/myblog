import AppDispatcher from '../dispatcher/AppDispatcher';

const BlogAction = {
	
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


	
};

export default BlogAction;