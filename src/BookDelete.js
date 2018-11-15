import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookDetails from './BookDetails.js'

class BookDelete extends Component
{
	static propTypes = {
		books: PropTypes.array.isRequired,
		onConfirm: PropTypes.func.isRequired,
	}
	render() {
		const { books, onConfirm } = this.props
		const path = window.location.pathname
		const split = path.split('/')
		const bookId = split[2]
		const book = books.find(x => x.Id === bookId)
		return (
			<div
				className='book-delete-page'
			>
				<BookDetails
					book={book}
				/>
				<p>Delete?</p>
				<button
					onClick={() => onConfirm(bookId)}
				>Confirm</button>
			</div>
		)
	}
}

export default BookDelete
