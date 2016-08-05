import { Dispatcher } from 'flux';
import BlogStore from '../stores/BlogStore';
import WalkingBlogStore from '../stores/WalkingBlogStore';

const AppDispatcher = new Dispatcher();

AppDispatcher.register(function(action) {

	switch( action.actionType ) {
		/* 博文 */
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
		case 'ADD_BLOG_LIKE':
			BlogStore.addLike(action.blogId); 
			break;
		case 'QUOTE_COMMENT':
			BlogStore.quoteComment(action.data); 
			break;

		/* 行博 */
		case 'FETCH_WALKINGBLOGS':
			WalkingBlogStore.fetchBlogList(); 
			break;
		case 'FETCH_WALKINGBLOG_DETAIL':
			WalkingBlogStore.fetchBlogDetail(action.blogId); 
			break;
		case 'FETCH_WALKINGBLOG_COMMENT':
			WalkingBlogStore.fetchComments(action.blogId);
			break;	
		case 'SEND_WALKINGBLOG_COMMENT':
			WalkingBlogStore.sendComment(action.formData); 
			break;
		case 'REPLY_WALKINGBLOG_COMMENT':
			WalkingBlogStore.replyComment(action.data); 
			break;
		case 'CANCEL_REPLY_COMMENT':
			WalkingBlogStore.cancelReply(); 
			break;
		case 'FETCH_NEAR_WALKINGBLOG':
			WalkingBlogStore.fetchNearBlog(action.blogId); 
			break;



	}

});

export default AppDispatcher;