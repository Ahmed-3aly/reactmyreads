import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookShelfGrid from './BookShelfGrid.js'

class BookShelf extends Component
{
	static propTypes = {
		onMove: PropTypes.func.isRequired,
		shelfId: PropTypes.number.isRequired,
		shelves: PropTypes.array.isRequired,
		books: PropTypes.array.isRequired,
	}
	render() {
		const { onMove, shelfId, shelves, books } = this.props
		const shelf = shelves.find(x => x.Id === shelfId)
		const shelfBooks = books.filter(x => x.ShelfId === shelfId)
		const showBooks = shelfBooks.length > 0
		return (
			<li
				key={shelfId}
				className='book-shelf'
			>
				<div
					className='book-shelf-title'
				>{shelf.Name}</div>
				<div className='book-shelf-bar'></div>
				{!showBooks &&
					<p
						className='book-shelf-empty'
					>Empty shelf</p>
				}
				{showBooks &&
					<BookShelfGrid
						onMove={onMove}
						shelves={shelves}
						books={shelfBooks}
					/>
				}
			</li>
		)
	}
}

export default BookShelf
