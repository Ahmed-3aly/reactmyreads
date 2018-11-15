import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import BookShelf from './BookShelf.js'

class BookGrid extends Component
{
	static propTypes = {
		onMove: PropTypes.func.isRequired,
		books: PropTypes.array.isRequired,
		shelves: PropTypes.array.isRequired,
	}
	render() {
		const { onMove, books, shelves } = this.props
		return (
			<div>
				<Route
					exact path='/'
					render={() => (
						<ul className='book-grid' >
							{shelves.filter(x => x.Id > 0).map(x => (
								<BookShelf
									key={x.Id}
									shelfId={x.Id}
									onMove={onMove}
									shelves={shelves}
									books={books}
								/>
							))}
						</ul>
					)}
				/>
				<Route
					path='/search'
					render={() => (
						<ul className='book-grid' >
							{shelves.map(x => (
								<BookShelf
									key={x.Id}
									shelfId={x.Id}
									onMove={onMove}
									shelves={shelves}
									books={books}
								/>
							))}
						</ul>
					)}
				/>
			</div>
		)
	}
}

export default BookGrid
