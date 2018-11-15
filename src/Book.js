import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookDetails from './BookDetails.js'
import BookActions from './BookActions.js'

class Book extends Component
{
	static propTypes = {
		onMove: PropTypes.func.isRequired,
		book: PropTypes.object.isRequired,
		shelves: PropTypes.array.isRequired,
	}
	render() {
		const { onMove, book, shelves } = this.props
		return (
			<li
				key={book.Id}
				className="book"
			>
				<BookActions
					onMove={onMove}
					book={book}
					shelves={shelves}
				/>
				<BookDetails
					book={book}
				/>
			</li>
		)
	}
}

export default Book
