import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book.js'

class BookShelfGrid extends Component
{
	static propTypes = {
		onMove: PropTypes.func.isRequired,
		shelves: PropTypes.array.isRequired,
		books: PropTypes.array.isRequired,
	}
	render() {
		const { onMove, shelves, books } = this.props
		return (
			<ol
				className='book-shelf-grid'
			>
				{books.map(book => (
					<Book
						key={book.Id}
						onMove={onMove}
						book={book}
						shelves={shelves}
					/>
				))}
			</ol>
		)
	}
}

export default BookShelfGrid
