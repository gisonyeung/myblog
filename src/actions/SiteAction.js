import AppDispatcher from '../dispatcher/AppDispatcher';

const SiteAction = {

	addSiteView() {
		AppDispatcher.dispatch({
			actionType: 'SITE_ADD_VIEW',
		});
	},

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

	sendCode(email) {
		AppDispatcher.dispatch({
			actionType: 'SITE_SEND_CODE',
			email: email,
		});
	},

	cancelSub(email, id) {
		AppDispatcher.dispatch({
			actionType: 'SITE_CANCEL_SUB',
			email: email,
			id: id,
		});
	},





};

export default SiteAction;