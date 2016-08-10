import AppDispatcher from '../dispatcher/AppDispatcher';

const SiteAction = {

	subBlog(formData) {
		AppDispatcher.dispatch({
			actionType: 'SITE_SUB_BLOG',
			formData: formData,
		});
	},

	fetchSiteNum() {
		AppDispatcher.dispatch({
			actionType: 'SITE_NUMBERS',
		});
	},

};

export default SiteAction;