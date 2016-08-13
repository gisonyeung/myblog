import { Dispatcher } from 'flux';
import BlogStore from '../stores/BlogStore';
import WalkingBlogStore from '../stores/WalkingBlogStore';
import BookStore from '../stores/BookStore';
import ArchiveStore from '../stores/ArchiveStore';
import SiteStore from '../stores/SiteStore';

const AppDispatcher = new Dispatcher();

AppDispatcher.register(function(action) {

	switch( action.actionType ) {
		/* 博文 */
		case 'FETCH_BLOGS_COUNT':
			BlogStore.fetchBlogsCount(); 
			break;
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


		/* 书单 */
		case 'FETCH_BOOKS':
			BookStore.fetchBookList();
			break;
		case 'ADD_BOOK_LIKE':
			BookStore.addBookLike(action.bookId);
			break;

		/* 归档 */
		case 'ARCHIVES_CONDITION':
			ArchiveStore.fetchByCondition(action.query);
			break;
		case 'ARCHIVES_ALL':
			ArchiveStore.fetchAll();
			break;
		case 'CATEGORY_LIST':
			ArchiveStore.fetchCategory();
			break;
		case 'TAG_LIST':
			ArchiveStore.fetchTags();
			break;
		case 'YEARBLOG_LIST':
			ArchiveStore.fetchYearBlogs(action.year);
			break;
		case 'SITE_YEAR':
			ArchiveStore.fetchSiteYear();
			break;

		/* 留言板 */
		case 'FETCH_BOARD_COMMENT':
			BlogStore.fetchBoardComments(); 
			break;
		case 'SEND_BOARD_COMMENT':
			BlogStore.sendBoardComments(action.formData); 
			break;


		/* 个人面板 */
		case 'SITE_SUB_BLOG':
			SiteStore.subBlog(action.formData);
			break;
		case 'SITE_NUMBERS':
			SiteStore.fetchSiteNum();
			break;
		case 'SITE_SEND_CODE':
			SiteStore.sendCode(action.email);
			break;
		case 'SITE_CANCEL_SUB':
			SiteStore.cancelSub(action.email, action.id);
			break;








	}

});

export default AppDispatcher;