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
	}

});

export default AppDispatcher;