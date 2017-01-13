import cookie from 'react-cookie';
import parseJSON from './parseJSON';
/*
	缓存规则：cookie 始终存储，localStorage用来模拟用户是否记住信息
*/

const COOKIES_MAXAGE = 60 * 60 * 24 * 90; // 90天
const STORAGE_RECORD_NAME = 'userInfo'


const infoCache = {

	/*
		从 localStorage 中加载缓存
		@return { Object } 
		{
	      nickname: String,
	      email: String,
	      website: String,
	    }
    */
	get() {
		let lsForm = parseJSON(localStorage.getItem(STORAGE_RECORD_NAME));

		if ( !lsForm.email ) {
			lsForm = {
				nickname: '',
			    email: '',
			    website: '',
			}
		}

	    return lsForm;
	},

	save(formData, isRemember) {

		cookie.save('nickname', formData.nickname, { path: '/', maxAge: COOKIES_MAXAGE });
    	cookie.save('email', formData.email, { path: '/', maxAge: COOKIES_MAXAGE });
    	cookie.save('website', formData.website, { path: '/', maxAge: COOKIES_MAXAGE });

    	const _formData = {
    		nickname: formData.nickname,
    		email: formData.email,
    		website: formData.website,
    	};

    	if ( isRemember ) {
    		localStorage.setItem(STORAGE_RECORD_NAME, JSON.stringify(_formData));
    	} else {
    		infoCache.clear();
    	}

	},

	// 只清空 localStorage 的缓存
	clear() {

		const formData = {
			nickname: '',
			email: '',
			website: '',
		};

		localStorage.setItem(STORAGE_RECORD_NAME, JSON.stringify(formData));
	}



};



export default infoCache;