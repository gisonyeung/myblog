import { Dispatcher } from 'flux';
import BlogStore from '../stores/BlogStore';

const AppDispatcher = new Dispatcher();

AppDispatcher.register(function(action) {

	switch( action.actionType ) {
		case 'FETCH_BLOGS':
			BlogStore.fetchBlogs(action.pageNum); 
			break;
		case 'FETCH_PAGES':
			BlogStore.fetchPages(); 
			break;
		case 'FETCH_BLOG_DETAIL':
			BlogStore.fetchBlogDetail(action.blogId); 
			break;
		case 'FETCH_NEAR_BLOG':
			BlogStore.fetchNearBlog(action.blogId); 
			break;
		case 'FETCH_BLOG_COMMENT':
			BlogStore.fetchComments(action.blogId); 
			break;
		case 'SEND_BLOG_COMMENT':
			BlogStore.sendComment(action.formData); 
			break;




	}

});

export default AppDispatcher;