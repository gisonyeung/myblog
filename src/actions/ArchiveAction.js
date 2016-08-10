import AppDispatcher from '../dispatcher/AppDispatcher';

const ArchiveAction = {

	fetchByCondition(query) {
		AppDispatcher.dispatch({
			actionType: 'ARCHIVES_CONDITION',
			query: query,
		});
	},

	fetchAll() {
		AppDispatcher.dispatch({
			actionType: 'ARCHIVES_ALL',
		});
	},

	fetchCategory() {

		AppDispatcher.dispatch({
			actionType: 'CATEGORY_LIST',			
		});

	},

	fetchTags() {

		AppDispatcher.dispatch({
			actionType: 'TAG_LIST',			
		});

	},

	fetchYearBlogs(year) {

		AppDispatcher.dispatch({
			actionType: 'YEARBLOG_LIST',		
			year: year,		
		});

	},

	fetchSiteYear() {

		AppDispatcher.dispatch({
			actionType: 'SITE_YEAR',		
		});

	},









};

export default ArchiveAction;