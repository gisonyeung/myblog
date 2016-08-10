import { EventEmitter } from 'events';
import assign from 'object-assign';
import fetch from '../utils/fetch';
import Api from '../constants/Api';
import _ from 'lodash';

const ArchiveStore = assign({}, EventEmitter.prototype, {

	archives: [],

	category: [],

	isFirstFetch_cate: true,

	tags: [],

	isFirstFetch_tags: true,

	yearBlogs: {
		'01': 0,
		'02': 0,
		'03': 0,
		'04': 0,
		'05': 0,
		'06': 0,
		'07': 0,
		'08': 0,
		'09': 0,
		'10': 0,
		'11': 0,
		'12': 0,
	},

	siteYear: {
		beginYear: 2016,
		currentYear: new Date().getFullYear(),
		span: new Date().getFullYear() - 2016 + 1,
	},

	getArchives: function() {
		return this.archives;
	},

	fetchByCondition: function(query) {

		fetch(Api.archiveCondition, {
			search: query
		})
		.then(data => {
			if ( data.result == 'success' ) {
				this.archives = data.archives;
				this.emitEvent('ARCHIVES_LIST');
			} 
		})
		.catch(err => {
			console.log(err);
		});

	},

	fetchAll: function() {

		fetch(Api.archiveAll)
		.then(data => {
			if ( data.result == 'success' ) {
				this.archives = data.archives;
				this.emitEvent('ARCHIVES_LIST');
			} 
		})
		.catch(err => {
			console.log(err);
		});

	},

	getCategory: function() {
		return this.category;
	},

	fetchCategory: function() {

		if ( this.isFirstFetch_cate ) {

			fetch(Api.categories)
				.then(data => {
					if ( data.result == 'success' ) {
						this.isFirstFetch_cate = false;
						this.category = data.category;
						this.emitEvent('CATEGORY_LIST');
					}
				})
				.catch(err => {
					console.log(err);
				});
		}

	},

	getTags: function() {
		return this.tags;
	},

	fetchTags: function() {

		if ( this.isFirstFetch_tags ) {

			fetch(Api.tags)
			.then(data => {
				if ( data.result == 'success' ) {
					this.isFirstFetch_tags = false;
					this.tags = data.tags;
					this.emitEvent('TAG_LIST');
				}
			})
			.catch(err => {
				console.log(err);
			});
		}

	},

	getYearBlogs: function() {
		return this.yearBlogs;
	},

	fetchYearBlogs: function(year) {

		fetch(Api.blogCountForYear, {
			year: year,
		})
		.then(data => {
			if ( data.result == 'success' ) {
				this.yearBlogs = data.yearBlogs;
				this.emitEvent('YEARBLOG_LIST');
			}
		})
		.catch(err => {
			console.log(err);
		});

	},

	getSiteYear: function() {
		return this.siteYear;
	},

	fetchSiteYear: function() {

		fetch(Api.siteYear)
		.then(data => {
			// this.siteYear = data;
			this.emitEvent('SITE_YEAR');
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

export default ArchiveStore;