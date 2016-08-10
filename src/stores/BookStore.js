import { EventEmitter } from 'events';
import assign from 'object-assign';
import fetch from '../utils/fetch';
import Api from '../constants/Api';
import _ from 'lodash';

const BookStore = assign({}, EventEmitter.prototype, {

	isFirstFetch: true,

	books: [],

	getBookList: function() {
		return this.books;
	},

	fetchBookList: function() {

		if ( this.isFirstFetch ) {

			fetch(Api.bookList)
			.then(data => {
				if ( data.result == 'success' ) {
					this.isFirstFetch = false;
					this.books = data.books;
					this.emitEvent('BOOK_LIST');
				} 
			})
			.catch(err => {
				console.log(err);
			});
		}

	},

	addBookLike: function(bookId) {

		fetch(Api.bookLike, {
			bookId: bookId,
		})
		.then(data => {

			this.emitEvent('REFRESH_LIKE', data);

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

export default BookStore;