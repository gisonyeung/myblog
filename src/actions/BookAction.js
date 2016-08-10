import AppDispatcher from '../dispatcher/AppDispatcher';

const BookAction = {

	fetchBooks() {
		AppDispatcher.dispatch({
			actionType: 'FETCH_BOOKS',
		});
	},

	addLike(bookId) {
		AppDispatcher.dispatch({
			actionType: 'ADD_BOOK_LIKE',
			bookId: bookId,
		});
	},

};

export default BookAction;