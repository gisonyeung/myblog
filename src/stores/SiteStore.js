import { EventEmitter } from 'events';
import assign from 'object-assign';
import fetch from '../utils/fetch';
import Api from '../constants/Api';
import _ from 'lodash';

const SiteStore = assign({}, EventEmitter.prototype, {

	firstNum: true,

	siteNum: {
		blog: 0,
		comment: 0,
		subscribe: 0,
	},

	subBlog: function(formData) {

		fetch(Api.subscribe, {
			nickname: formData.nickname,
			email: formData.email,
		})
		.then(data => {
			// 更新个人信息栏数据
			this.fetchSiteNum();
			this.emitEvent('SUBSCRIBE_BLOG', data);
		})
		.catch(err => {
			console.log(err);
		});

	},

	getSiteNum: function() {

		// 第一次调用，则请求站点数据
		if ( this.firstNum ) {
			this.firstNum = false;
			this.fetchSiteNum();
		}

		return this.siteNum;
	},

	fetchSiteNum: function() {

		fetch(Api.siteNum)
		.then(data => {
			if( data.result == 'success' ) {

				this.siteNum = {
					blog: data.numbers[0],
					comment: data.numbers[1],
					subscribe: data.numbers[2],
				}
				this.emitEvent('SITE_NUMBERS');

			} else { // 获取站点数据失败，则把异步开关打开
				this.firstNum = true;
			}
		})
		.catch(err => {
			console.log(err);
		});

	},

	emitEvent: function(event, data) {
		this.emit(event, data);
	},

	addChangeListener: function(event, callback) {
		this.on(event, callback);
	},

	removeChangeListener: function(event, callback) {
		this.removeListener(event, callback);
	}

});

export default SiteStore;